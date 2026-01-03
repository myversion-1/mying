#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate multilingual image filenames and Alt text mapping for products.
Reads product data and generates:
- Filenames: [product-name]-[core-keyword]-[country-code].jpg
- Alt texts: 11 languages for each filename
"""

import json
import re
from typing import Dict, List, Tuple

# Language to country code mapping
LANG_TO_COUNTRY = {
    "en": "usa",
    "zh": "china",
    "ar": "saudi",
    "ru": "russia",
    "ja": "japan",
    "ko": "korea",
    "th": "thailand",
    "vi": "vietnam",
    "id": "indonesia",
    "hi": "india",
    "es": "spain",
}

# Core keywords based on product category and name patterns
# Format: [keyword]-manufacturer (e.g., ride-manufacturer, carousel-manufacturer)
def get_core_keyword(product_name: str, category: str) -> str:
    """Extract core keyword from product name and category
    Returns format: [keyword]-manufacturer
    """
    name_lower = product_name.lower()
    
    # Name-based keywords (more specific first)
    if "carousel" in name_lower:
        return "carousel-ride-manufacturer"
    elif "bumper" in name_lower or "collision" in name_lower:
        return "bumper-car-manufacturer"
    elif "train" in name_lower:
        return "mini-train-manufacturer"
    elif "kart" in name_lower or "racing" in name_lower:
        return "go-kart-manufacturer"
    elif "trampoline" in name_lower or "jump" in name_lower:
        return "trampoline-manufacturer"
    elif "ferris" in name_lower or "wheel" in name_lower:
        return "ferris-wheel-manufacturer"
    elif "ship" in name_lower or "pirate" in name_lower:
        return "pirate-ship-manufacturer"
    elif "water" in name_lower or "rafting" in name_lower:
        return "water-ride-manufacturer"
    elif "swing" in name_lower:
        return "swing-ride-manufacturer"
    elif "tank" in name_lower:
        return "tank-ride-manufacturer"
    elif "adventure" in name_lower:
        return "adventure-ride-manufacturer"
    
    # Category-based keywords (fallback)
    category_keywords = {
        "Family Ride": "family-ride-manufacturer",
        "Thrill Adventure": "thrill-ride-manufacturer",
        "Water Attraction": "water-ride-manufacturer",
        "Kiddie Fun": "kiddie-ride-manufacturer",
    }
    
    if category in category_keywords:
        return category_keywords[category]
    
    # Default
    return "amusement-ride-manufacturer"

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    # Remove special characters, keep only alphanumeric and spaces
    text = re.sub(r'[^\w\s-]', '', text)
    # Replace spaces and multiple hyphens with single hyphen
    text = re.sub(r'[\s_-]+', '-', text)
    # Convert to lowercase
    text = text.lower()
    # Remove leading/trailing hyphens
    text = text.strip('-')
    return text

def generate_filename(product_name: str, lang: str, category: str) -> str:
    """Generate filename: [product-name]-[core-keyword]-[country-code].jpg
    Example: carousel-ride-manufacturer-thailand-th.jpg
    """
    product_slug = slugify(product_name)
    core_keyword = get_core_keyword(product_name, category)
    country_name = LANG_TO_COUNTRY[lang]
    lang_code = lang
    
    # Format: [product-name]-[core-keyword]-[country-name]-[lang-code].jpg
    return f"{product_slug}-{core_keyword}-{country_name}-{lang_code}.jpg"

# Product data extracted from products_multilingual.ts
PRODUCTS = [
    {"en": "Nuclear energy crisis", "zh": "核能危机", "category": "Family Ride"},
    {"en": "Energy Plan", "zh": "能源计划", "category": "Family Ride"},
    {"en": "Star Nuclear Guard", "zh": "星核护卫队", "category": "Family Ride"},
    {"en": "Meow Nuclear Team", "zh": "喵核战队", "category": "Family Ride"},
    {"en": "SPATIOTEMPORAL EDDY CURRENT - Model 2", "zh": "时空涡流 - 型号2", "category": "Family Ride"},
    {"en": "Stellar core ripples", "zh": "星核涟漪", "category": "Family Ride"},
    {"en": "Star Nucleus Explorer - Model 2", "zh": "星核探险家 - 型号2", "category": "Family Ride"},
    {"en": "Meow Nuclear Carousel", "zh": "星核旋转木马", "category": "Family Ride"},
    {"en": "Galaxy Collision", "zh": "银河大碰撞", "category": "Family Ride"},
    {"en": "Meow Nuclear Storm", "zh": "猫核风暴", "category": "Family Ride"},
    {"en": "Super Warrior", "zh": "超能战士", "category": "Family Ride"},
    {"en": "Star core jumping bed", "zh": "星核蹦乐床", "category": "Family Ride"},
    {"en": "Future Engine", "zh": "未来引擎", "category": "Family Ride"},
    {"en": "Rotating Matrix", "zh": "旋转矩阵", "category": "Family Ride"},
    {"en": "MEOW NUCLEAR MECHA CAR", "zh": "喵核机甲车", "category": "Family Ride"},
    {"en": "MEOW NUCLEAR MECHA CAR (Single)", "zh": "喵核机甲车（单座）", "category": "Family Ride"},
    {"en": "Meow Core Train", "zh": "喵核小火车", "category": "Family Ride"},
    {"en": "MEOW CORE TRAIN - Model 2", "zh": "喵核小火车 - 型号2", "category": "Family Ride"},
    {"en": "Cat-core bumper cars", "zh": "Cat-core bumper cars", "category": "Family Ride"},
    {"en": "Cobra bumper cars", "zh": "Cobra bumper cars", "category": "Family Ride"},
    {"en": "Alien Invasion", "zh": "Alien Invasion", "category": "Family Ride"},
    {"en": "Quantum Jump", "zh": "量子弹跳", "category": "Family Ride"},
    {"en": "Pendulum Play", "zh": "玩转钟摆", "category": "Family Ride"},
    {"en": "CrossFire", "zh": "穿越火线", "category": "Family Ride"},
    {"en": "Nuclear Disco", "zh": "核能迪斯科", "category": "Family Ride"},
    {"en": "RoboCop", "zh": "星际迷航", "category": "Family Ride"},
    {"en": "Catnip Knight", "zh": "喵核骑士", "category": "Family Ride"},
    {"en": "Nuclear Energy Crisis Flying Chair", "zh": "核能危机 空中飞椅", "category": "Family Ride"},
    {"en": "MOUNTAINEER", "zh": "爬山车 MOUNTAINEER", "category": "Family Ride"},
    {"en": "The Great Collision of Galaxies", "zh": "银河大碰撞- 碰碰车", "category": "Family Ride"},
    {"en": "GLOBAL SPACE", "zh": "太空环球记 GLOBAL SPACE", "category": "Family Ride"},
    {"en": "INTERSTELLAR MADNESS STATION", "zh": "星际疯狂站)", "category": "Family Ride"},
    {"en": "MEOW NUCLEAR MECHA CAR (Single) - Model 2", "zh": "喵核机甲车（单座）- 型号2", "category": "Family Ride"},
    {"en": "MEOW NUCLEAR MECHA CAR (Single) - Model 3", "zh": "喵核机甲车（单座）- 型号3", "category": "Family Ride"},
    {"en": "MEOW CORE TRAIN - Model 3", "zh": "喵核小火车 - 型号3", "category": "Family Ride"},
    {"en": "MEOW CORE TRAIN - Model 4", "zh": "喵核小火车 - 型号4", "category": "Family Ride"},
    {"en": "POSEIDON", "zh": "海神号 POSEIDON", "category": "Water Attraction"},
    {"en": "INTERSTELLAR", "zh": "穿越时空 INTERSTELLAR", "category": "Family Ride"},
    {"en": "Quantum Jump - Model 2", "zh": "量子弹跳 - 型号2", "category": "Family Ride"},
    {"en": "LUCKY CAROUSEL", "zh": "幸运转马", "category": "Family Ride"},
    {"en": "ROMANTIC CAROUSEL", "zh": "浪漫拾光转马", "category": "Family Ride"},
    {"en": "Astronaut Self-Control Aircraft", "zh": "宇航员自控飞机", "category": "Family Ride"},
    {"en": "MOE DUCK LAND", "zh": "萌鸭乐园", "category": "Kiddie Fun"},
    {"en": "PET WARS CLIMBING CAR", "zh": "宠物作战儿童爬山车)", "category": "Kiddie Fun"},
    {"en": "MAGIC CASTLE WATER RAFTING", "zh": "童话城堡水道漂流", "category": "Water Attraction"},
    {"en": "FANTASY STAR INTERNET CELEBRITY SWING", "zh": "梦幻星网红秋千", "category": "Family Ride"},
    {"en": "OFF ROAD VEHICLE", "zh": "越野战车 OFF-ROAD VEHICLE", "category": "Family Ride"},
    {"en": "Spinning Ferris Wheel", "zh": "旋转飞椅", "category": "Family Ride"},
    {"en": "MOE DUCK LAND", "zh": "喷球车", "category": "Kiddie Fun"},
    {"en": "Rotating Matrix - Model 2", "zh": "旋转矩阵 - 型号2", "category": "Family Ride"},
    {"en": "GLOBAL GLIDING", "zh": "环球滑翔", "category": "Family Ride"},
    {"en": "PIRATE SHIP", "zh": "海盗船 PIRATE SHIP", "category": "Family Ride"},
    {"en": "Interstellar Adventure Six-Person Trampoline", "zh": "星际探险六人蹦床", "category": "Family Ride"},
    {"en": "MAGIC CASTLE WATER RAFTING", "zh": "打地鼠儿童单人蹦床", "category": "Family Ride"},
    {"en": "KUPAO GO KART", "zh": "酷跑卡丁车)", "category": "Family Ride"},
    {"en": "KODUCK MINI TRAIN", "zh": "哒哒鸭小火车)", "category": "Family Ride"},
    {"en": "SPACE MINI TRAIN", "zh": "太空队小火车)", "category": "Family Ride"},
    {"en": "WILD DRIFT BUMPER CAR", "zh": "狂飙漂移碰碰车", "category": "Family Ride"},
    {"en": "TORNADO DRIFT BUMPER CAR", "zh": "旋风漂移碰碰车", "category": "Family Ride"},
    {"en": "VICTORY DRIFT BUMPER CAR", "zh": "赛赢漂移碰碰车", "category": "Family Ride"},
    {"en": "WIND DRIVEN DRIFT COLLISION CAR", "zh": "风驰漂移碰碰车", "category": "Family Ride"},
    {"en": "MAIXUAN DRIFT COLLISION CAR", "zh": "MAIXUAN DRIFT COLLISION CAR", "category": "Family Ride"},
    {"en": "TORNADO RACING CAR", "zh": "旋风飞车", "category": "Family Ride"},
    {"en": "Q MOE RACING CAR", "zh": "萌飞车", "category": "Family Ride"},
    {"en": "OFF ROAD TANK", "zh": "越野战车", "category": "Family Ride"},
    {"en": "SUPER RACING CAR", "zh": "急速飞车", "category": "Family Ride"},
    {"en": "BIG EYES RACING CAR", "zh": "大眼酷飞车", "category": "Family Ride"},
    {"en": "Super Warrior - Model 2", "zh": "超能战士 - 型号2", "category": "Family Ride"},
    {"en": "Pendulum Play - Model 2", "zh": "玩转钟摆 - 型号2", "category": "Family Ride"},
]

# Multilingual Alt text templates
ALT_TEXT_TEMPLATES = {
    "en": "{product_name} - Premium Amusement Ride Equipment by Miying Manufacturer",
    "zh": "{product_name_zh} - 米盈优质游乐设备制造商",
    "ar": "{product_name} - معدات ألعاب ترفيهية عالية الجودة من شركة Miying",
    "ru": "{product_name} - Премиальное оборудование для аттракционов от производителя Miying",
    "ja": "{product_name} - Miyingメーカーのプレミアムアトラクション設備",
    "ko": "{product_name} - Miying 제조사의 프리미엄 놀이기구 장비",
    "th": "{product_name} - อุปกรณ์เครื่องเล่นคุณภาพสูงจากผู้ผลิต Miying",
    "vi": "{product_name} - Thiết bị trò chơi giải trí cao cấp từ nhà sản xuất Miying",
    "id": "{product_name} - Peralatan Wahana Hiburan Premium dari Produsen Miying",
    "hi": "{product_name} - Miying निर्माता द्वारा प्रीमियम मनोरंजन सवारी उपकरण",
    "es": "{product_name} - Equipamiento de Atracciones Premium del Fabricante Miying",
}

def generate_alt_text(product_name_en: str, product_name_zh: str, lang: str) -> str:
    """Generate Alt text in the specified language"""
    template = ALT_TEXT_TEMPLATES.get(lang, ALT_TEXT_TEMPLATES["en"])
    return template.format(
        product_name=product_name_en,
        product_name_zh=product_name_zh
    )

def main():
    """Generate the complete mapping"""
    mapping = {}
    
    for product in PRODUCTS:
        product_name_en = product["en"]
        product_name_zh = product.get("zh", product_name_en)
        category = product.get("category", "Family Ride")
        
        # Generate filenames for all 11 languages
        for lang in LANG_TO_COUNTRY.keys():
            filename = generate_filename(product_name_en, lang, category)
            
            if filename not in mapping:
                mapping[filename] = {
                    "product_name_en": product_name_en,
                    "product_name_zh": product_name_zh,
                    "category": category,
                    "target_language": lang,
                    "country_code": LANG_TO_COUNTRY[lang],
                    "alt_texts": {}
                }
            
            # Generate Alt texts for all 11 languages
            for alt_lang in LANG_TO_COUNTRY.keys():
                alt_text = generate_alt_text(product_name_en, product_name_zh, alt_lang)
                mapping[filename]["alt_texts"][alt_lang] = alt_text
    
    # Output JSON
    output = {
        "metadata": {
            "total_products": len(PRODUCTS),
            "total_languages": len(LANG_TO_COUNTRY),
            "total_filenames": len(mapping),
            "filename_format": "[product-name]-[core-keyword]-[country-name]-[lang-code].jpg",
            "example": "carousel-ride-manufacturer-thailand-th.jpg",
            "generated_at": "2025-01-28",
            "description": "Multilingual image filename and Alt text mapping for SEO optimization"
        },
        "languages": {
            lang: {
                "code": lang,
                "country": LANG_TO_COUNTRY[lang],
                "country_name": {
                    "en": "USA", "zh": "中国", "ar": "السعودية", "ru": "Россия",
                    "ja": "日本", "ko": "한국", "th": "ไทย", "vi": "Việt Nam",
                    "id": "Indonesia", "hi": "भारत", "es": "España"
                }.get(lang, "")
            }
            for lang in LANG_TO_COUNTRY.keys()
        },
        "mapping": mapping
    }
    
    # Save to JSON file
    with open("product_image_mapping.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    # Also create a summary file
    summary = {
        "total_products": len(PRODUCTS),
        "total_filenames": len(mapping),
        "sample_filenames": list(mapping.keys())[:5],
        "sample_entry": mapping[list(mapping.keys())[0]] if mapping else None
    }
    
    with open("product_image_mapping_summary.json", "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    print(f"[OK] Generated mapping for {len(PRODUCTS)} products")
    print(f"[OK] Total filenames: {len(mapping)}")
    print(f"[OK] Output files:")
    print(f"   - product_image_mapping.json (complete mapping)")
    print(f"   - product_image_mapping_summary.json (summary)")
    print(f"\n[INFO] Example filename: {list(mapping.keys())[0] if mapping else 'N/A'}")
    print(f"[INFO] Example Alt text (en): {mapping[list(mapping.keys())[0]]['alt_texts']['en'] if mapping else 'N/A'}")

if __name__ == "__main__":
    main()

