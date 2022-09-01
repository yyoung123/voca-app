import { useState, useRef } from "react";

export default function UseRefComponent() {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);
  console.log(refCount);
  let varCount = 0;
  const incCount = () => {
    console.log("varCount===", varCount);
    console.log("varCount===", refCount.current);
    setCount(count + 1);
  };
  const incVarCount = () => {
    varCount++;
    console.log("varCount===", varCount);
  };
  const incRefCount = () => {
    refCount.current++;
    console.log("varCount===", refCount.current);
  };
  return (
    <>
      <div>
        <p style={{ color: "black", fontSize: 20 }}>{count}</p>
        <button style={{ padding: 20 }} onClick={incCount}>
          useState로 만드는 counter
        </button>
      </div>
      <div>
        <p style={{ color: "black", fontSize: 20 }}>{varCount}</p>
        <button style={{ padding: 20 }} onClick={incVarCount}>
          일반변수로 만드는 counter
        </button>
      </div>
      <div>
        <p style={{ color: "black", fontSize: 20 }}>{refCount.current}</p>
        <button style={{ padding: 20 }} onClick={incRefCount}>
          useRef로 만드는 counter
          {/* dom을 제어할때 쓰인다.*/}
        </button>
      </div>
    </>
  );
}
