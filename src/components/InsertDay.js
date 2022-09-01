import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// axios get /post 가지고 값을 가지고 오고 읽기
export default function InsertDay() {
  const navigate = useNavigate();
  const [days, setDays] = useState([]); //useState(기본값)
  useEffect(() => {
    axios.get("http://127.0.0.1:8099/days").then((res) => {
      setDays(res.data);
    });
  }, []);
  const insertDay = () => {
    // axios rkwlrh json-server에 데이터 밀어넣기
    axios.post("http://127.0.0.1:8099/day/add", { day: days.length + 1 }).then((res) => {
      if (res.data.insert === "ok") {
        alert("day가 추가되었습니다.");
        navigate("/");
      }
      // if (res.statusText === "Created") {
      //   alert("day가 추가되었습니다.");
      //   navigate("/");
      //   // location.href='/';
      // }
    });
  };
  return (
    <>
      <div className="container dayBox">
        <h2 className="title">insert day</h2>
        <p className="current">
          current day :
          <strong>
            <span className="day">{days.length}</span>
            <span className="unit">day</span>
          </strong>
        </p>
        <div className="btns">
          <button className="btn" onClick={insertDay}>
            add day
          </button>
        </div>
      </div>
    </>
  );
}
