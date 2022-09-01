import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Voca from "./Voca";

export default function Day(props) {
  const [voca, setVoca] = useState([]);
  const { day } = useParams(); //hook은 상단 네비게이션의 params 값을 받을때 쓴다.
  // console.log(day);
  // const day= useParams();
  // queryString
  useEffect(() => {
    axios.get(`http://127.0.0.1:8099/voca/${day}`).then((res) => {
      setVoca(res.data);
      // console.log(res.data);
    });
  }, []);
  return (
    <>
      <div className="container dayBox">
        <h2 className="title">Day-{day}</h2>
        {/* 여기에 day/1에 해당하는 값을 뿌린다. */}
        <ul className="vocas">
          {voca.map((item, idx) => {
            return <Voca kor={item.kor} eng={item.eng} key={item.id} isDone={item.isDone} id={item.id} day={item.day} />; //컴파일과정에더 들어가는 것 key={item.id}또는{idx}넣어주기
          })}
        </ul>
        <div className="btns">
          {/* component */}
          <Link to="/" className="btn">
            BACK
          </Link>
        </div>
      </div>
    </>
  );
}
