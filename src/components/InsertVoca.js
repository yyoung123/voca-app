import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InsertVoca() {
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  // react에서 Dom에 접근할때 useRef라는 Hook을 사용한다.
  const eng = useRef();
  const kor = useRef();
  const day = useRef();
  console.log(eng);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("form에 있는 데이터전송");
    console.log(eng.current.value);
    console.log(kor.current.value);
    console.log(day.current.value);
    axios
      .post(`http://127.0.0.1:8099/voca/add`, {
        day: parseInt(day.current.value),
        eng: eng.current.value,
        kor: kor.current.value,
        isDone: false,
      })
      .then((res) => {
        //console.log("입력되었습니다.");
        console.log(res);
        alert("단어가 입력되었습니다.");
        if (res.data.insert === "ok") {
          navigate(`/day/${day.current.value}`);
        }
      });
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8099/days`).then((res) => {
      console.log(res.data);
      setDays(res.data);
    });
  }, []);
  return (
    <>
      <div className="container dayBox">
        <h2 className="title">Insert Voca</h2>
        <form className="vocaBox" onSubmit={onSubmit}>
          <div className="inputBox">
            <label>ENG</label>
            <input type="text" name="" id="" placeholder="write english ex)dog" ref={eng} />
          </div>
          <div className="inputBox">
            <label>KOR</label>
            <input type="text" name="" id="" placeholder="뜻을 적으세요 ex)강아지" ref={kor} />
          </div>
          <div className="inputBox">
            <select name="" id="" ref={day}>
              {/* option 태그를 반복 ...*/}
              {days.map((item, idx) => {
                return (
                  <option value={item.day} key={idx}>
                    {item.day}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btns">
            <button className="btn">SEND</button>
          </div>
        </form>
      </div>
    </>
  );
}
// dom에 접근할때는 ref 값으로 주기
