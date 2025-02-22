// 导入useState和useEffect, useRef
import { useState, useEffect, useRef } from "react"; 
import "../styles.css"; // 确保引入样式，向上一级引入

export default function CartoonReaction() {
  const [imgSrc, setImgSrc] = useState("./img/neutral.jpg");
  const [rejectText, setRejectText] = useState("残忍say NO");
  const [agreeSize, setAgreeSize] = useState(16);
  const [rejectSize, setRejectSize] = useState(1); // 用于拒绝按钮的缩放
  const buttonRef = useRef(null); 

  const handleReject = () => {
    // 每次点击拒绝按钮，缩小按钮
    setRejectSize(prevSize => Math.max(0.3, prevSize - 0.1)); // 确保不小于0.3

    if (rejectText === "残忍say NO") {
      setRejectText("嗯嗯嗯？（期待");
      setAgreeSize(20);
    } else if (rejectText === "嗯嗯嗯？（期待") {
      setRejectText("你你你不爱我了吗？（委屈");
      setAgreeSize(30);
    } else if (rejectText === "你你你不爱我了吗？（委屈") {
      setRejectText("不，你是爱我的❤️");
      setAgreeSize(40);
    } else if (rejectText === "不，你是爱我的❤️") {
      setRejectText("既然这样。。。是时候。。。");
      setAgreeSize(50);
    } else if (rejectText === "既然这样。。。是时候。。。") {
      setRejectText("让另一个选项更大一些啦～");
      setAgreeSize(60);
    } else if (rejectText === "让另一个选项更大一些啦～") {
      setRejectText("好吧...😢（才怪");
      setAgreeSize(70);
    } else {
      setRejectText("（哭得超大声！！！");
      setAgreeSize(80);
    }
  };

  const handleMouseMove = (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const index = Math.floor((angle + 360) / 30) % 12;

    switch(index) {
      case 0: setImgSrc("./img/0.jpg"); break;
      case 1: setImgSrc("./img/30.jpg"); break;
      case 2: setImgSrc("./img/60.jpg"); break;
      case 3: setImgSrc("./img/90.jpg"); break;
      case 4: setImgSrc("./img/120.jpg"); break;
      case 5: setImgSrc("./img/150.jpg"); break;
      case 6: setImgSrc("./img/180.jpg"); break;
      case 7: setImgSrc("./img/210.jpg"); break;
      case 8: setImgSrc("./img/240.jpg"); break;
      case 9: setImgSrc("./img/270.jpg"); break;
      case 10: setImgSrc("./img/300.jpg"); break;
      case 11: setImgSrc("./img/330.jpg"); break;
      default: setImgSrc("./img/neutral.jpg");
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
          className="shake" // 添加抖动的类
          style={{
            backgroundColor: "#f56565",
            color: "white",
            borderRadius: "0.5rem",
            padding: "0.5rem 1.5rem", // 增加内边距
            fontSize: `${rejectSize * 20}px`, // 拒绝按钮字体大小
            transition: "transform 0.2s ease-in-out", // 增加缩放动画效果
            width: "100%", // 按钮宽度适应
            maxWidth: "200px", // 最大宽度限制
            minWidth: "150px", // 添加最小宽度
          }}
          onMouseEnter={() => buttonRef.current.classList.add("shake-active")}
          onMouseLeave={() => buttonRef.current.classList.remove("shake-active")}
          onClick={handleReject}
        >
          {rejectText}
        </button>
      </div>
    </div>
  );
}
