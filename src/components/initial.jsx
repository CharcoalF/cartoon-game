import { useState, useEffect, useRef } from "react";
import "../styles.css"; // 确保引入样式

export default function CartoonReaction() {
  const [imgSrc, setImgSrc] = useState("/img/neutral.jpg");
  const [rejectText, setRejectText] = useState("残忍say NO");
  const [agreeSize, setAgreeSize] = useState(16);
  const [comeButtonSize, setComeButtonSize] = useState(16);
  const [showGift, setShowGift] = useState(false);
  const [rejectSize, setRejectSize] = useState(1);
  const [rejectPosition, setRejectPosition] = useState({ top: "60%", left: "50%" });
  const [guess, setGuess] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleMouseMove = (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const index = Math.floor((angle + 360) / 30) % 12;

    setImgSrc(`/img/${index * 30}.jpg`);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

    setRejectPosition({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`
    });
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    if (guess.trim()) {
      setFeedbackList(prevList => [...prevList, guess]);
      if (["除了快乐禁止入内", "DO U", "礼物"].includes(guess)) {
        setShowGift(true);
        setTimeout(() => setShowGift(false), 3000);
      }
      setGuess("");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold", color: "#ff69b4" }}>
        来听歌啊，歌不听吗？🎵
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <img src={imgSrc} alt="character" style={{ width: "400px", height: "400px" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <button 
          style={{ backgroundColor: "#48bb78", color: "white", borderRadius: "8px", fontSize: `${comeButtonSize}px` }}
          onClick={() => setImgSrc("/img/happy.png")}
        >来啦</button>

        <button 
          style={{ position: "absolute", top: rejectPosition.top, left: rejectPosition.left, backgroundColor: "#f56565", color: "white", borderRadius: "8px", fontSize: `${rejectSize * 20}px`, transition: "all 0.3s ease-in-out" }}
          onClick={handleReject}
        >
          {rejectText}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input type="text" value={guess} onChange={handleGuessChange} placeholder="输入你的答案..." />
        <button onClick={handleGuessSubmit}>提交</button>
      </div>

      <ul style={{ textAlign: "center", marginTop: "20px" }}>
        {feedbackList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
