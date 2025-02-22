// 导入useState和useEffect, useRef
import { useState, useEffect, useRef } from "react"; 

export default function CartoonReaction() {
  const [imgSrc, setImgSrc] = useState("./img/neutral.jpg");
  const [rejectText, setRejectText] = useState("拒绝");
  const [agreeSize, setAgreeSize] = useState(16);
  const buttonRef = useRef(null); 
  
  const handleReject = () => {
    if (rejectText === "拒绝") {
      setRejectText("要不，再想想？（期待）");
      setAgreeSize(20);
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
      const buttonCenterY = buttonRect.y + buttonRect.height / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const deltaX = mouseX - buttonCenterX;
      const deltaY = mouseY - buttonCenterY;

      if (deltaX < -50 && deltaY < -50) {
        setImgSrc("./img/look-left-top.jpg");
      } else if (deltaX < -50 && deltaY > 50) {
        setImgSrc("./img/look-left-bottom.jpg");
      } else if (deltaX < -50) {
        setImgSrc("./img/look-left.jpg");
      } else if (deltaX > 50 && deltaY < -50) {
        setImgSrc("./img/look-right-top.jpg");
      } else if (deltaX > 50 && deltaY > 50) {
        setImgSrc("./img/look-right-bottom.jpg");
      } else if (deltaX > 50) {
        setImgSrc("./img/look-right.jpg");
      } else if (deltaY < -50) {
        setImgSrc("./img/look-top.jpg");
      } else if (deltaY > 50) {
        setImgSrc("./img/look-bottom.jpg");
      } else {
        setImgSrc("./img/neutral.jpg");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> 
      {/* 固定图片的宽高,确保每个图片都相同 */}
      <img src={imgSrc} alt="character" className="w-32 h-32 mb-6" style={{ width: "256px", height: "256px" }} />
      <div className="mt-2 flex space-x-4">
        <button 
          className="bg-green-500 text-white rounded-lg px-6 py-3 text-lg"
          style={{ fontSize: `${agreeSize}px`, padding: `${agreeSize / 3}px ${agreeSize / 2}px` }} 
          onClick={() => setImgSrc("./img/happy.png")}
        >
          同意
        </button>
        <button ref={buttonRef} className="bg-red-500 text-white rounded-lg px-6 py-3 text-lg" 
          onClick={handleReject}>
          {rejectText}
        </button>
      </div>
    </div>
  );
}
