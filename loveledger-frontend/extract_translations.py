import os
import re
import json

# 配置
SRC_DIR = './src'  # 你的项目 src 目录
EN_FILE = './src/locales/en.json'  # 英文翻译文件
ZH_FILE = './src/locales/zh.json'  # 中文翻译文件

# 正则表达式，用于匹配 t('string') 或 t(`string`)
T_FUNCTION_REGEX = r't\(\s*[\'"`](.*?)[\'"`]\s*\)'
# T_FUNCTION_REGEX = r't\(\s*([\'"`])(.*?)\1\s*\)'


def extract_strings_from_file(file_path):
    """从文件中提取所有 t() 函数包裹的字符串"""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        return re.findall(T_FUNCTION_REGEX, content)

def scan_directory_for_translations(src_dir):
    """扫描 src 目录，提取所有翻译字符串"""
    translations = {'en': {}, 'zh': {}}
    
    # 遍历 src 目录
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                strings = extract_strings_from_file(file_path)
                
                for string in strings:
                    # 假设字符串没有中文，先都放入英文
                    translations['en'][string] = string
                    translations['zh'][string] = string  # 这里假设中文和英文内容相同，可以根据需要修改

    return translations

def save_to_json_file(data, file_path):
    """将数据保存到指定的 JSON 文件中"""
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)

def main():
    # 扫描 src 目录并提取所有翻译字符串
    translations = scan_directory_for_translations(SRC_DIR)
    
    # 保存英文和中文翻译文件
    save_to_json_file(translations['en'], EN_FILE)
    save_to_json_file(translations['zh'], ZH_FILE)

    print(f"提取的翻译字符串已保存到 {EN_FILE} 和 {ZH_FILE}")

if __name__ == '__main__':
    main()
