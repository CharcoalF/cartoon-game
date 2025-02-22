// 导入useState和useEffect, useRef
// useState 是 React 的 状态管理 钩子（hook），可以让组件存储和更新数据。
// 这里用它来存储 imgSrc，即当前要显示的人物图片路径
import { useState, useEffect, useRef } from "react"; 

// 定义 React 组件 & export default 让这个组件可以被其他文件导入并使用。
export default function CartoonReaction() {
  // 定义 imgSrc 
  // 创建状态变量 imgSrc的初始值是 "neutral.jpg"（默认图片）。
  // setImgSrc 是 修改 imgSrc 的函数，当调用它时，React 会重新渲染组件，更新图片。
  // 比如之后setImgSrc("happy.jpg"); // 会把图片改成 "happy.jpg"
  const [imgSrc, setImgSrc] = useState("./img/neutral.png");
  const [rejectText, setRejectText] = useState("拒绝");
  const [agreeSize, setAgreeSize] = useState(16); // 以 px 为单位存储按钮大小
  const buttonRef = useRef(null); // 用于引用拒绝按钮
  
  const handleReject = () => {
    if (rejectText === "拒绝") {
      setRejectText("要不，再想想？（期待）");
      setAgreeSize(20); // 增大字体大小
    } else if (rejectText === "要不，再想想？（期待）") {
      setRejectText("你你你不爱我了吗？（委屈）");
      setAgreeSize(30);
    } else if (rejectText === "你你你不爱我了吗？（委屈）") {
      setRejectText("不，你是爱我的❤️");
      setAgreeSize(40);
    } else if (rejectText === "不，你是爱我的❤️") {
      setRejectText("既然这样。。。是时候。。。");
      setAgreeSize(50);
    } else if (rejectText === "既然这样。。。是时候。。。") {
      setRejectText("让另一个选项更大一些啦～");
      setAgreeSize(60);
    } else if (rejectText === "让另一个选项更大一些啦～") {
      setRejectText("好吧...😢（才怪）");
      setAgreeSize(70);
    } else {
      setRejectText("（哭得超大声！！！");
      setAgreeSize(80);
    }
  };

  const handleMouseMove = (event) => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = buttonRect.x + buttonRect.width / 2;
      const distance = Math.abs(event.clientX - buttonCenterX);
      const maxDistance = 200; // 设定一个最大距离
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      if (normalizedDistance < 1) {
        setImgSrc(normalizedDistance < 0.5 ? "./img/happy.png" : "./img/sad.png");
      } else {
        setImgSrc("./img/neutral.png");
      }
    }
  };

  useEffect(() => {
    // 添加鼠标移动事件监听器
    window.addEventListener("mousemove", handleMouseMove);

    // 清理函数以移除事件监听器
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  //console.log("当前图片:", imgSrc);

  return (
    // 这个 <div> 是页面的主容器。
    // Tailwind CSS，用于美化布局：
    // flex flex-col → 让内容垂直排列。
    // items-center justify-center → 让内容居中。
    // min-h-screen → 让容器至少和整个屏幕一样高。
    // bg-gray-100 → 设置背景颜色为浅灰色。
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> 
      {/* 显示人物图片:
      <img> 用于显示图片，
      src={imgSrc} 让图片的路径动态变化（通过 useState 控制）。
      className="w-48 h-48" → Tailwind CSS 样式，让图片宽高为 48（大约 192px）。
      alt="character" → 提供文本描述（无障碍支持）。 */}
      {/* 图片是如何变化的:
      如果 setImgSrc("scared.jpg") 触发了，imgSrc 变为 "scared.jpg"，那么 <img> 组件就会更新图片。 */}
      <img src={imgSrc} alt="character" className="w-48 h-48" />
      {/* 按钮容器
      mt-4 → 外边距（margin-top: 16px），让按钮和图片之间有空隙。
      flex space-x-4 → 横向排列按钮，并增加它们之间的间距（16px）。 */}
      <div className="mt-4 flex space-x-4">
      {/* “同意” 按钮
      bg-green-500 → 按钮颜色是绿色。
      text-white → 文字颜色是白色。
      px-6 py-3 → 内边距，让按钮更大更好看。
      rounded-lg → 圆角，让按钮看起来更圆滑。
      text-lg → 字体大小变大，更易读。 */}
        <button 
          className="bg-green-500 text-white rounded-lg px-6 py-3"
          style={{ fontSize: `${agreeSize}px`, padding: `${agreeSize / 3}px ${agreeSize / 2}px` }} // 用 style 控制字体和内边距
          onClick={() => setImgSrc("./img/happy.png")}
        >
          同意
        </button>
        {/* “拒绝” 按钮
        颜色是红色 (bg-red-500) */}
        <button ref={buttonRef} className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg"
          onClick={handleReject}>
          {rejectText}
        </button>
      </div>
    </div>
  );
}
