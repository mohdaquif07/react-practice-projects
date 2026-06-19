import React, { useEffect, useState, useCallback } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");
  const [rgbColor, setRgbColor] = useState("rgb(234,343,456)");
  const [copied, setCopied] = useState(false);
  const [hexCopied, setHexCopied] = useState(false);
  function utility(length) {
    return Math.floor(Math.random() * length);
  }

  function copyAnimation(e) {
    if (e === "rgb") {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } else {
      setHexCopied(true);

      setTimeout(() => {
        setHexCopied(false);
      }, 1000);
    }
  }

  const copyColorToClipboard = useCallback(
    (e) => {
      e.target.accessKey === "hex"
        ? window.navigator.clipboard.writeText(color)
        : window.navigator.clipboard.writeText(rgbColor);
      // passwordRef.current?.select();
      // passwordRef.current?.setSelectionRange(0, 999);
      // window.navigator.clipboard.writeText(password)
      console.log(e);
      copyAnimation(e.target.accessKey);
    },
    [typeOfColor, color, rgbColor],
  );

  useEffect(() => {
    return typeOfColor === "hex"
      ? handleCreateRandomHexColor()
      : handleCreateRandomRgbColor();
  }, [typeOfColor]);

  function handleCreateRandomHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[utility(hex.length)];
    }
    setColor(hexColor);
  }
  function handleCreateRandomRgbColor() {
    let red = utility(256);
    let green = utility(256);
    let blue = utility(256);

    const rgb = `rgb(${red},${green},${blue})`;
    setRgbColor(rgb);
  }

  return (
    <div
      className={`Body w-[100vw] h-[100vh] bg-[${typeOfColor === "hex" ? color : "#998989"}]`}
    >
      <div className="button-container  flex justify-center items-start gap-3 w-[100%]">
        <button
          className="p-[10px] bg-[red] rounded-[10px]"
          onClick={() => setTypeOfColor("hex")}
        >
          Create Hex Code
        </button>
        <button
          className="p-[10px] bg-[red] rounded-[10px]"
          onClick={() => setTypeOfColor("rgb")}
        >
          Create RGB Color
        </button>
        <button
          className="p-[10px] bg-[red] rounded-[10px]"
          onClick={
            typeOfColor === "hex"
              ? handleCreateRandomHexColor
              : handleCreateRandomRgbColor
          }
        >
          Generate Random Color
        </button>
      </div>

      <div className="w-[100vw] flex flex-col justify-center items-center gap-[30px] mt-8">
        <div className="text-5xl">{typeOfColor}</div>
        <div
          className={`container w-[150px] h-[150px] border-2 border-solid border-black bg-[${rgbColor}] flex flex-col justify-center items-center gap-2 font-sans`}
        >
          {rgbColor}
          <button
            className="p-1 bg-red-500 rounded-[5px]"
            accessKey="rgb"
            onClick={(e) => copyColorToClipboard(e)}
          >
            Copy
          </button>
          {copied && <p>Copied</p>}
        </div>
        <div className="text-8xl">{color}</div>
        <button
          className="p-1 bg-red-500 rounded-[5px]"
          accessKey="hex"
          onClick={(e) => copyColorToClipboard(e)}
        >
          Copy
        </button>
        {hexCopied && <p>Copied</p>}
      </div>
    </div>
  );
}
