import { useDispatch, useSelector } from "react-redux";
import { signupUser, fetchSignups } from "../store/signupSlice";
import { useState } from "react";

const SignupButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser); // ✅ 从 Redux 获取 user
  const signed = useSelector((state) => state.signup.signedList || []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const alreadySigned =
    user && signed.some((p) => String(p.id) === String(user.id));

  const handleSignup = async () => {
    if (!user) {
      setMessage("请先登录 / Please log in first");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await dispatch(signupUser(user)).unwrap();
      if (res.success) {
        setMessage("报名成功 / Signup successful");
        setIsError(false);
        dispatch(fetchSignups()); // 自动刷新报名列表
      } else {
        setMessage(res.message || "报名失败 / Signup failed");
        setIsError(true);
      }
    } catch (err) {
      setMessage("发生错误 / Error occurred");
      setIsError(true);
    } finally {
      setLoading(false);
    }

    console.log("👤 当前用户 user:", user);
    console.log("📝 报名列表 signed:", signed);
    console.log(
      "📌 判断结果:",
      signed.some((p) => String(p.id) === String(user?.id))
    );
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <button onClick={handleSignup} disabled={loading}>
        {loading
          ? "提交中... / Submitting..."
          : alreadySigned
          ? "为朋友报名 / Sign up for a friend"
          : "点击报名 / Sign Up"}
      </button>
      {message && (
        <div style={{ marginTop: "0.5rem", color: isError ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default SignupButton;
