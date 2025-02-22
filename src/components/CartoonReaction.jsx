// 导入useState和useEffect, useRef
import { useState, useEffect, useRef } from "react"; 

export default function CartoonReaction() {
  const [imgSrc, setImgSrc] = useState("./img/neutral.jpg");
  const [rejectText, setRejectText] = useState("残忍say NO");
  const [agreeSize, setAgreeSize] = useState(16);
  const [rejectSize, setRejectSize] = useState(1); // 用于拒绝按钮的缩放
  const buttonRef = useRef(null); 
  
  const handleReject = () => {
    if (rejectText === "残忍say NO") {
      setRejectText("嗯嗯嗯？（期待");
      setAgreeSize(20);
      setRejectSize(0.9); // 减小拒绝按钮
    } else if (rejectText === "嗯嗯嗯？（期待") {
      setRejectText("你你你不爱我了吗？（委屈");
      setAgreeSize(30);
      setRejectSize(0.8);
    } else if (rejectText === "你你你不爱我了吗？（委屈") {
      setRejectText("不，你是爱我的❤️");
      setAgreeSize(40);
      setRejectSize(0.7);
    } else if (rejectText === "不，你是爱我的❤️") {
      setRejectText("既然这样。。。是时候。。。");
      setAgreeSize(50);
      setRejectSize(0.6);
    } else if (rejectText === "既然这样。。。是时候。。。") {
      setRejectText("让另一个选项更大一些啦～");
      setAgreeSize(60);
      setRejectSize(0.5);
    } else if (rejectText === "让另一个选项更大一些啦～") {
      setRejectText("好吧...😢（才怪");
      setAgreeSize(70);
      setRejectSize(0.4);
    } else {
      setRejectText("（哭得超大声！！！");
      setAgreeSize(80);
      setRejectSize(0.3);
    }
  };

  const handleMouseMove = (event) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    // 计算角度
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 180; // 转换为角度并调整范围

    // 根据角度选择图片
    const index = Math.floor(angle / 30) % 12; // 每30度一个图片，总共12个图片
    switch(index) {
      case 0: setImgSrc("./img/0.jpg"); break;  // 0度
      case 1: setImgSrc("./img/30.jpg"); break; // 30度
      case 2: setImgSrc("./img/60.jpg"); break; // 60度
      case 3: setImgSrc("./img/90.jpg"); break; // 90度
      case 4: setImgSrc("./img/120.jpg"); break; // 120度
      case 5: setImgSrc("./img/150.jpg"); break; // 150度
      case 6: setImgSrc("./img/180.jpg"); break; // 180度
      case 7: setImgSrc("./img/210.jpg"); break; // 210度
      case 8: setImgSrc("./img/240.jpg"); break; // 240度
      case 9: setImgSrc("./img/270.jpg"); break; // 270度
      case 10: setImgSrc("./img/300.jpg"); break; // 300度
      case 11: setImgSrc("./img/330.jpg"); break; // 330度
      // 这里可以添加更多的表情图
      default: setImgSrc("./img/neutral.jpg"); // 默认中立表情
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      margin: 0, 
      padding: 0, 
      overflow: "hidden" // 确保没有溢出
    }}> 
      {/* 标题部分 */}
      <div style={{ textAlign: "center", margin: "16px 0", fontSize: "36px", fontWeight: "600", fontFamily: "Poppins, sans-serif" }}>
        <span style={{ color: "yellow" }}>来</span>
        <span style={{ color: "purple" }}>听</span>
        <span style={{ color: "red" }}>歌</span>
        <span style={{ color: "yellow" }}>啊</span>
        <span style={{ color: "purple" }}>！</span>
        <span style={{ color: "red" }}>歌</span>
        <span style={{ color: "yellow" }}>不</span>
        <span style={{ color: "purple" }}>听</span>
        <span style={{ color: "red" }}>嘛</span>
        <span style={{ color: "yellow" }}>？</span>
      </div>

      {/* 背景图片 */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("./img/background.jpg")', // 确保路径正确
          backgroundSize: "cover", // 让背景图片覆盖整个屏幕
          backgroundPosition: "center",
          opacity: 0.6,
          filter: "blur(8px)",
          zIndex: -1,
        }} 
      />
      
      {/* 固定图片的宽高，确保每个图片都相同 */}
      <img src={imgSrc} alt="character" style={{ width: "400px", height: "400px", zIndex: 1, position: "relative" }} />
      
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <button 
          style={{
            backgroundColor: "#48bb78",
            color: "white",
            borderRadius: "0.5rem",
            padding: "0.5rem 1.5rem", // 增加内边距
            fontSize: `${agreeSize}px`,
            width: "100%", // 按钮宽度适应
            maxWidth: "200px", // 最大宽度限制
            minWidth: "150px", // 添加最小宽度
          }}
          onClick={() => setImgSrc("./img/happy.png")}
        >
          来啦
        </button>
        <button 
          ref={buttonRef} 
          style={{
            backgroundColor: "#f56565",
            color: "white",
            borderRadius: "0.5rem",
            padding: "0.5rem 1.5rem", // 增加内边距
            fontSize: `${rejectSize * 20}px`, // 拒绝按钮字体大小
            transform: `scale(${rejectSize})`, // 根据大小缩放按钮
            transition: "transform 0.2s ease-in-out", // 增加缩放动画效果
            width: "100%", // 按钮宽度适应
            maxWidth: "200px", // 最大宽度限制
            minWidth: "150px", // 添加最小宽度
          }}
          onClick={handleReject}
        >
          {rejectText}
        </button>
      </div>
    </div>
  );
}
