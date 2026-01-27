#!/usr/bin/env python3
"""
Web 应用测试脚本 - 使用 Playwright 测试个人播客网站
"""
from playwright.sync_api import sync_playwright
import os

# 截图保存目录
SCREENSHOT_DIR = "/tmp/webapp_test"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_webapp():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        # 监听控制台消息
        console_messages = []
        page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))

        print("1. 访问首页...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")

        # 截取首页截图
        page.screenshot(path=f"{SCREENSHOT_DIR}/01_homepage.png", full_page=True)
        print(f"   截图已保存: {SCREENSHOT_DIR}/01_homepage.png")

        # 获取页面标题
        title = page.title()
        print(f"   页面标题: {title}")

        # 检查页面内容
        print("\n2. 检查页面元素...")

        # 查找所有链接
        links = page.locator("a").all()
        print(f"   找到 {len(links)} 个链接")

        # 查找所有按钮
        buttons = page.locator("button").all()
        print(f"   找到 {len(buttons)} 个按钮")

        # 查找主要内容区域
        main_content = page.locator("main, [role='main'], .main, #main").first
        if main_content:
            print("   找到主内容区域")

        # 获取页面 HTML 结构概览
        print("\n3. 页面结构分析...")
        html_content = page.content()

        # 检查是否有导航
        nav = page.locator("nav, [role='navigation']").all()
        print(f"   导航元素: {len(nav)} 个")

        # 检查是否有文章列表
        articles = page.locator("article, .article, [role='article']").all()
        print(f"   文章元素: {len(articles)} 个")

        # 检查响应式设计 - 移动端视图
        print("\n4. 测试移动端视图...")
        page.set_viewport_size({"width": 375, "height": 667})
        page.wait_for_timeout(500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/02_mobile_view.png", full_page=True)
        print(f"   移动端截图已保存: {SCREENSHOT_DIR}/02_mobile_view.png")

        # 恢复桌面视图
        page.set_viewport_size({"width": 1280, "height": 800})

        # 测试交互元素
        print("\n5. 测试交互元素...")
        clickable = page.locator("a, button, [role='button'], [onclick]").all()
        print(f"   可点击元素: {len(clickable)} 个")

        # 尝试点击第一个链接（如果存在）
        if links:
            first_link = links[0]
            href = first_link.get_attribute("href")
            text = first_link.text_content()
            print(f"   第一个链接: '{text}' -> {href}")

        # 输出控制台消息
        if console_messages:
            print("\n6. 控制台消息:")
            for msg in console_messages[:10]:  # 只显示前10条
                print(f"   {msg}")
        else:
            print("\n6. 无控制台消息")

        # 检查是否有错误
        errors = [m for m in console_messages if "error" in m.lower()]
        if errors:
            print(f"\n⚠️  发现 {len(errors)} 个错误消息")
        else:
            print("\n✓ 未发现控制台错误")

        print(f"\n测试完成! 截图保存在: {SCREENSHOT_DIR}/")

        browser.close()

if __name__ == "__main__":
    test_webapp()
