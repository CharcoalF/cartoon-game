import { useState, useEffect, useRef } from "react"; 
import "../styles.css"; // 确保引入样式，向上一级引入

export default function CartoonReaction() {
  const [imgSrc, setImgSrc] = useState("./img/neutral.jpg");
  const [rejectText, setRejectText] = useState("残忍say NO");
  const [agreeSize, setAgreeSize] = useState(16);
  const [rejectSize, setRejectSize] = useState(1);
  const [countdown, setCountdown] = useState(null);
  const [showRejectButton, setShowRejectButton] = useState(true);
  const [comeButtonSize, setComeButtonSize] = useState(16);
  const [guess, setGuess] = useState(""); // 用户猜测
  const [feedbackList, setFeedbackList] = useState([]);
  const [showGift, setShowGift] = useState(false); // 彩蛋状态
  const buttonRef = useRef(null); 

  const handleReject = () => {
    setRejectSize(prevSize => Math.max(0.3, prevSize - 0.1));

    if (rejectText === "残忍say NO") {
      setRejectText("嗯嗯嗯？（期待");
      setAgreeSize(20);
      setComeButtonSize(prevSize => prevSize + 4);
    } else if (rejectText === "嗯嗯嗯？（期待") {
      setRejectText("你你你不爱我了吗？（委屈");
      setAgreeSize(30);
      setComeButtonSize(prevSize => prevSize + 4);
    } else if (rejectText === "你你你不爱我了吗？（委屈") {
      setRejectText("不，你是爱我的❤️");
      setAgreeSize(40);
      setComeButtonSize(prevSize => prevSize + 4);
    } else if (rejectText === "不，你是爱我的❤️") {
      setRejectText("既然这样。。。是时候。。。");
      setAgreeSize(50);
      setComeButtonSize(prevSize => prevSize + 4);
    } else if (rejectText === "既然这样。。。是时候。。。") {
      setRejectText("让另一个选项更大一些啦～");
      setAgreeSize(60);
      setComeButtonSize(prevSize => prevSize + 4);
    } else if (rejectText === "让另一个选项更大一些啦～") {
      setRejectText("好吧...😢（才怪");
      setAgreeSize(70);
      setComeButtonSize(prevSize => prevSize + 4);
    } else {
      setRejectText("（哭得超大声！！！");
      setAgreeSize(80);
      setComeButtonSize(prevSize => prevSize + 4);
    }

    setCountdown(5);
    setShowRejectButton(true);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setRejectText("残忍say NO");
      setAgreeSize(16);
      setRejectSize(1);
      setCountdown(null);
      setShowRejectButton(false);
      setComeButtonSize(40);
      return; 
    }
    
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

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

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    if (guess.trim()) {
      setFeedbackList(prevList => [...prevList, guess]);

      // 检查用户输入的内容是否为彩蛋内容
      if (guess === "除了快乐禁止入内" || guess === "DO U" || guess === "礼物") {
        setShowGift(true); // 触发彩蛋
        setTimeout(() => setShowGift(false), 3000); // 3秒后隐藏礼物
      }

      setGuess(""); // 清空输入框
    }
  };

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      margin: 0, 
      padding: 0, 
      overflow: "hidden"
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
          backgroundImage: 'url("./img/background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          filter: "blur(8px)",
          zIndex: -1,
        }} 
      />
      
      {/* 固定图片的宽高 */}
      <img src={imgSrc} alt="character" style={{ width: "400px", height: "400px", zIndex: 1, position: "relative" }} />
      
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <button 
          style={{
            backgroundColor: "#48bb78",
            color: "white",
            borderRadius: "0.5rem",
            padding: "0.5rem 1.5rem",
            fontSize: `${comeButtonSize}px`,
            width: "100%",
            maxWidth: "200px",
            minWidth: "150px",
          }}
          onClick={() => setImgSrc("./img/happy.png")}
        >
          来啦
        </button>

        {showRejectButton && (
          <button 
            ref={buttonRef} 
            className="shake" 
            style={{
              backgroundColor: "#f56565",
              color: "white",
              borderRadius: "0.5rem",
              padding: "0.5rem 1.5rem",
              fontSize: `${rejectSize * 20}px`,
              transition: "transform 0.2s ease-in-out",
              width: "100%",
              maxWidth: "200px",
              minWidth: "150px",
            }}
            onMouseEnter={() => buttonRef.current.classList.add("shake-active")}
            onMouseLeave={() => buttonRef.current.classList.remove("shake-active")}
            onClick={handleReject}
          >
            {rejectText} {countdown !== null ? `(${countdown})` : ''}
          </button>
        )}

        {/* 猜谜输入框和提交按钮 */}
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <input 
            type="text" 
            value={guess} 
            onChange={handleGuessChange} 
            placeholder="进入会场的指南是..." 
            style={{ 
              width: "250px",
              height: "30px",
              fontSize: "16px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button 
            onClick={handleGuessSubmit}
            style={{
              backgroundColor: "#48bb78",
              color: "white",
              borderRadius: "0.5rem",
              padding: "0.5rem 1.5rem",
              fontSize: "16px",
              width: "100%",
              maxWidth: "200px",
              minWidth: "150px",
            }}
          >
            堡儿要提交了
          </button>
        </div>

        {/* 显示提交的内容 */}
        <div style={{ marginTop: "16px", fontSize: "16px", color: "#333" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {feedbackList.map((item, index) => (
              <li key={index} style={{ backgroundColor: "#f7f7f7", borderRadius: "4px", padding: "10px", margin: "5px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 彩蛋效果 */}
        {showGift && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
            <span style={{ fontSize: "100px", color: "gold", animation: "fall 2s infinite" }}>🎁</span>
          </div>
        )}
      </div>
    </div>
  );
}
