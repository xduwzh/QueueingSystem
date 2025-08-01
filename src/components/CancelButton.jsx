import { useDispatch, useSelector } from "react-redux";
import { cancelSignupUser, fetchSignups } from "../store/signupSlice";
import { useState } from "react";

const CancelButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser); // ✅ 从 Redux 获取 user
  const signedList = useSelector((state) => state.signup.signedList);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const alreadySigned =
    user &&
    signedList &&
    signedList.some((p) => String(p.id) === String(user.id));

  if (!alreadySigned) return null;

  const handleCancel = async () => {
    if (!user) {
      setMessage("请先登录 / Please log in first");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await dispatch(cancelSignupUser(user)).unwrap();
      setMessage("已取消报名 / Signup cancelled");
      setIsError(false);
      dispatch(fetchSignups()); // ✅ 重新获取报名数据
    } catch (err) {
      setMessage(err || "取消失败 / Cancel failed");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <button onClick={handleCancel} disabled={loading}>
        {loading ? "取消中... / Cancelling..." : "取消报名 / Cancel Signup"}
      </button>
      {message && (
        <div style={{ marginTop: "0.5rem", color: isError ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CancelButton;
