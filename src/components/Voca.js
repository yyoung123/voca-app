import axios from "axios";
import { useEffect, useState } from "react";
export default function Voca(props) {
  // console.log(props);
  const [info, setInfo] = useState(props);
  console.log(info);
  const [isVisible, setIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(props.isDone);
  // let isVisible = true;
  console.log(isDone);
  const toggleKor = function () {
    // console.log(isVisible);
    setIsVisible(!isVisible);
  };
  const toggleDone = function () {
    // axios.get()read
    // axios.post()create
    // axios.put()update
    // axios.delete()delete
    // console.log(...props);
    axios
      .put(`http://127.0.0.1:8099/voca/${props.id}`, {
        // eng: props.eng,
        // kore: props.kor,
        // id: props.id,
        // day: props.day,
        // ...props,
        isDone: !isDone,
      })
      .then((res) => {
        console.log(res);
        if (res.data.update === "ok") {
          console.log("바꼈다");
          setIsDone(!isDone);
        }
      });
  };
  const deleteVoca = () => {
    if (window.confirm("다외웠나요?")) {
      // console.log("delete");
      axios.delete(`http://127.0.0.1:8099/voca/${props.id}`).then((res) => {
        console.log(res.data);
        if (res.data.delete === "ok") {
          setInfo({ id: -1 });
        }
        // if (res.statusText === "OK") {
        //   setInfo({ id: -1 });
        //   // setIsDone(!isDone);
        //   // console.log("지워졌습니다.");
        //   // db에서 값을 지웠다는 결과를 받았기 때문에 -1을 세팅하고
        //   // 아래쪽에서 return false를 통해 화면에서 렌더링 안되게 만든다.
        // }
      });
    }
  };

  if (info.id === -1) {
    return false;
  }

  // 컴퍼넌트 단위로 모든게 움직인다.
  return (
    <li className={isDone ? "done" : ""} data-idx={props.id}>
      <div className="check">
        <label htmlFor="" className="checkBox">
          <input type="checkbox" onChange={toggleDone} />
          <span className="label"></span>
          <span>{props.msg}</span>
        </label>
      </div>
      <div className="eng word">{props.eng}</div>
      <div className="kor word">{isVisible && props.kor}</div>
      <div className="btns">
        <button className="btn hidden" onClick={toggleKor}>
          Hidden
        </button>
        <button className="btn del" onClick={deleteVoca}>
          Del
        </button>
      </div>
    </li>
  );
}
