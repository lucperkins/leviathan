import Alpine from "alpinejs";
import setup from "../src/alpine";

setup(Alpine);
(window as any).Alpine = Alpine;
Alpine.start();
