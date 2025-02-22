# Cartoon Reaction Component

## 简介

`CartoonReaction` 是一个 React 组件，展示了一个卡通人物的反应，用户可以通过鼠标移动来影响人物的表情和视线方向。该组件结合了鼠标事件和状态管理，增强了用户互动体验。

## 环境

```
npx create-vite cartoon-game --template react
cd cartoon-game
npm install
npm install framer-motion
npm install @shadcn/ui
npm run dev
```

## 功能

- 根据鼠标位置动态变化卡通人物的视线方向。
- 提供“同意”和“拒绝”按钮，用户可以与卡通人物进行互动。
- 按钮的状态和文本会随着用户的点击而变化，增加趣味性。

## 技术栈

- React
- Tailwind CSS
- JavaScript

## 组件结构

`CartoonReaction` 组件的主要结构如下：

```javascript
export default function CartoonReaction() {
  // 组件状态和逻辑
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={imgSrc} alt="character" className="w-32 h-32 mb-6" />
      <div className="mt-2 flex space-x-4">
        <button className="bg-green-500 text-white rounded-lg px-6 py-3 text-lg">
          同意
        </button>
        <button
          ref={buttonRef}
          className="bg-red-500 text-white rounded-lg px-6 py-3 text-lg"
        >
          {rejectText}
        </button>
      </div>
    </div>
  );
}
```

## 自定义

- 可以通过替换 `./img/` 文件夹中的图片文件，来更改卡通人物的表情。
- 调整按钮样式和文本，使其符合你的设计需求。

## 贡献

欢迎任何形式的贡献！请在提交请求之前确保进行充分的测试。
