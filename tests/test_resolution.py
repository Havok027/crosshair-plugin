"""Resolução automática pelo ID do aparelho e novos modelos de mira."""
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
spec = importlib.util.spec_from_file_location("crosshair_res", Path(__file__).resolve().parents[1] / "main.py")
plugin = importlib.util.module_from_spec(spec)
spec.loader.exec_module(plugin)


def fake_system(tmp, product="", board="", modes=None):
    dmi = Path(tmp) / "dmi"
    dmi.mkdir()
    (dmi / "product_name").write_text(product)
    (dmi / "board_name").write_text(board)
    if modes:
        d = Path(tmp) / "drm" / "card0-eDP-1"
        d.mkdir(parents=True)
        (d / "modes").write_text(modes)
    plugin.DMI_DIR = str(dmi)
    plugin.DRM_MODES_GLOB = str(Path(tmp) / "drm" / "card*-eDP-*" / "modes")


class ResolutionTests(unittest.TestCase):
    def detect(self, **kw):
        with tempfile.TemporaryDirectory() as tmp:
            fake_system(tmp, **kw)
            return plugin.detect_resolution()

    def test_by_device_id(self):
        self.assertEqual(self.detect(product="Jupiter"), "800p")
        self.assertEqual(self.detect(product="83L3"), "1200p")
        self.assertEqual(self.detect(product="83E1"), "1600p")
        self.assertEqual(self.detect(product="x", board="Galileo"), "800p")

    def test_by_panel_when_id_unknown(self):
        self.assertEqual(self.detect(product="???", modes="1920x1200\n1280x800\n"), "1200p")
        self.assertEqual(self.detect(product="???", modes="800x1280\n"), "800p")

    def test_first_option_when_nothing_matches(self):
        self.assertEqual(self.detect(product="???"), next(iter(plugin.RESOLUTIONS)))
        self.assertEqual(self.detect(product="???", modes="1234x567\n"), next(iter(plugin.RESOLUTIONS)))

    def test_ids_point_to_existing_resolutions(self):
        for res in plugin.DEVICE_IDS.values():
            self.assertIn(res, plugin.RESOLUTIONS)

    def test_auto_on_load_and_manual_choice_turns_it_off(self):
        with tempfile.TemporaryDirectory() as tmp:
            fake_system(tmp, product="83E1")
            p = plugin.Plugin()
            p.settings_path = str(Path(tmp) / "s.json")
            p.backup_path = str(Path(tmp) / "b.json")
            p.load_settings()
            self.assertEqual(p.settings["resolution"], "1600p")
            self.assertTrue(p.settings["resolution_auto"])
            merged = dict(p.settings, resolution="2160p")
            merged["resolution_auto"] = False
            self.assertFalse(p.sanitize(merged)["resolution_auto"])

    def test_old_config_with_manual_resolution_stays_manual(self):
        with tempfile.TemporaryDirectory() as tmp:
            fake_system(tmp, product="83E1")
            p = plugin.Plugin()
            p.settings_path = str(Path(tmp) / "s.json")
            p.backup_path = str(Path(tmp) / "b.json")
            Path(p.settings_path).write_text('{"resolution": "1080p"}')
            p.load_settings()
            self.assertEqual(p.settings["resolution"], "1080p")
            self.assertFalse(p.settings["resolution_auto"])


class ModelTests(unittest.TestCase):
    def test_every_model_is_valid_and_centered(self):
        self.assertEqual(len(plugin.MODELS), 14)
        self.assertNotIn("hash", plugin.MODELS)
        for mid, m in plugin.MODELS.items():
            self.assertEqual(len(m["lines"]), 3, mid)
            self.assertGreater(m["half_w"], 0, mid)
            for res in plugin.RESOLUTIONS:
                p = plugin.Plugin()
                p.settings = p.sanitize({**p.settings, "model": mid, "resolution": res})
                x, y = p.compute_offsets()
                self.assertIsInstance(x, int)
                self.assertIsInstance(y, int)
                self.assertIn(m["lines"][1].strip() or "x", p.build_config(force_enabled=True) or "x")


if __name__ == "__main__":
    unittest.main()
