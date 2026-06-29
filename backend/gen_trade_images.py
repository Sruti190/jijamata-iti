"""One-off script to generate 8 photorealistic trade images via Gemini Nano Banana."""
import asyncio, os, base64, sys
from pathlib import Path
from dotenv import load_dotenv

sys.path.insert(0, str(Path(__file__).parent))
load_dotenv(Path(__file__).parent / ".env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/public/trades")
OUT.mkdir(parents=True, exist_ok=True)

STYLE = (
    "Photorealistic, cinematic, warm natural lighting, shallow depth of field. "
    "An Indian young male trainee student, ~19 years old, wearing a clean blue cotton work uniform "
    "(jumpsuit/coveralls) and a bright yellow safety hard hat with safety goggles. "
    "Focused expression, hands actively working. Modern industrial training workshop interior. "
    "Wide composition with negative space at the top for a text overlay. No watermark, no text."
)

TRADES = {
    "electrician": "wiring an electrical distribution panel with a screwdriver, exposed copper wires, voltage tester nearby",
    "fitter": "filing a metal workpiece on a bench vice with hand files and calipers, precision toolwork",
    "welder": "MIG welding a steel frame with bright sparks flying, welding helmet flipped up, leather gloves",
    "copa": "typing on a desktop computer in a clean IT training lab with multiple monitors showing code and spreadsheets",
    "turner": "operating a metal lathe machine, holding a measuring caliper, metal shavings curling off the workpiece",
    "wireman": "installing residential electrical wiring in a junction box on a wall, conduit pipes visible",
    "electronics-mechanic": "soldering a printed circuit board (PCB) under a magnifying lamp with multimeter on the table",
    "painter-general": "applying smooth wall paint with a roller in a freshly prepared room, paint tray and brushes on a drop cloth",
}

async def gen(slug: str, activity: str):
    out = OUT / f"{slug}.png"
    if out.exists():
        print(f"skip {slug}")
        return
    prompt = f"{STYLE} The trainee is {activity}."
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id=f"trade-{slug}", system_message="You are an image generator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if not images:
        print(f"FAIL {slug}: no image")
        return
    out.write_bytes(base64.b64decode(images[0]["data"]))
    print(f"saved {slug} ({out.stat().st_size//1024} KB)")

async def main():
    for slug, act in TRADES.items():
        try:
            await gen(slug, act)
        except Exception as e:
            print(f"ERR {slug}: {e}")

if __name__ == "__main__":
    asyncio.run(main())
