"""Opacidade e contorno no arquivo do MangoHud."""
import logging
import sys
import tempfile
import types
import unittest
from pathlib import Path
import importlib.util

if sys.platform == "win32":
    sys.modules.setdefault("fcntl", types.SimpleNamespace(ioctl=None))
sys.modules.setdefault("decky", types.SimpleNamespace(
    DECKY_PLUGIN_SETTINGS_DIR=tempfile.gettempdir(), logger=logging.getLogger("test")))
spec = importlib.util.spec_from_file_location("crosshair_outline", Path(__file__).resolve().parents[1] / "main.py")
plugin = importlib.util.module_from_spec(spec)
spec.loader.exec_module(plugin)


def make(**changes):
    p = plugin.Plugin()
    p.settings = p.sanitize({**p.settings, **changes})
    return p


class OutlineTests(unittest.TestCase):
    def test_defaults_are_opaque_without_outline(self):
        cfg = make(enabled=True).build_config()
        self.assertIn("alpha=1.0\n", cfg)
        self.assertIn("text_outline=0\n", cfg)
        self.assertNotIn("text_outline_color", cfg)

    def test_opacity_and_outline_are_written(self):
        cfg = make(enabled=True, opacity=60, outline=True, outline_color="#ffffff", outline_width=3).build_config()
        self.assertIn("alpha=0.6\n", cfg)
        self.assertIn("text_outline=1\ntext_outline_color=FFFFFF\ntext_outline_thickness=3\n", cfg)
        self.assertTrue(cfg.rstrip().endswith(plugin.CONFIG_MARKER))

    def test_invalid_values_fall_back(self):
        p = make(opacity="x", outline_color="zz", outline_width=99)
        self.assertEqual((p.settings["opacity"], p.settings["outline_color"], p.settings["outline_width"]), (100, "000000", 5))
        self.assertEqual(make(opacity=1).settings["opacity"], 10)

    def test_old_profile_gets_defaults_and_new_one_keeps_values(self):
        old = plugin.sanitize_profile({"model": "dot"}, "Old")
        self.assertEqual((old["opacity"], old["outline"], old["outline_width"]), (100, False, 2))
        new = plugin.sanitize_profile({"opacity": 40, "outline": True, "outline_color": "00ff66", "outline_width": 4}, "New")
        self.assertEqual((new["opacity"], new["outline"], new["outline_color"], new["outline_width"]), (40, True, "00FF66", 4))

    def test_position_does_not_depend_on_look(self):
        a = make(enabled=True).compute_offsets()
        b = make(enabled=True, opacity=30, outline=True).compute_offsets()
        self.assertEqual(a, b)


if __name__ == "__main__":
    unittest.main()
