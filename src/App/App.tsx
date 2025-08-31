import React, { useState, FormEvent } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  MessageBox,
  Select,
  Title,
} from "./styles";
import { InferenceClient } from "@huggingface/inference";

const storyStyles = [
  { value: "adventurous", label: "Adventurous" },
  { value: "funny", label: "Funny" },
  { value: "educational", label: "Educational" },
  { value: "magical", label: "Magical" },
];
const client = new InferenceClient(process.env.REACT_APP_HF_TOKEN);

const App = () => {
  const [theme, setTheme] = useState<string>("");
  const [style, setStyle] = useState<string>(storyStyles[0].value);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [storyTitle, setStoryTitle] = useState<string>("");

  // Instead of generating, we use fixed images in /public/images
  const [images, setImages] = useState<string[]>([
    "/images/page1.jpg",
    "/images/page2.jpg",
    "/images/page3.jpg",
    "/images/page4.jpg",
    "/images/page5.jpg",
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (theme.trim() === "") {
      alert("Please enter a story theme!");
      return;
    }
    setSubmitted(true);
    setStoryTitle(`Your ${style} Story about "${theme}"`);
  };

  const handleReset = () => {
    setTheme("");
    setSubmitted(false);
    setStoryTitle("");
  };

  return (
    <Container>
      <Title>Magic Tale Maker</Title>

      {!submitted ? (
        <Form onSubmit={handleSubmit}>
          <Label>
            Enter your story theme:
            <Input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. A rabbit who finds a magic carrot"
              required
            />
          </Label>

          <Label>
            Choose story style:
            <Select value={style} onChange={(e) => setStyle(e.target.value)}>
              {storyStyles.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Label>

          <Button type="submit">Open Story Book</Button>
        </Form>
      ) : (
        <MessageBox>
          <h2 style={{ marginBottom: "1rem" }}>{storyTitle}</h2>
          <HTMLFlipBook
              width={350}
              height={500}
              size="stretch"
              minWidth={300}
              maxWidth={600}
              minHeight={400}
              maxHeight={800}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              className="storybook" startPage={0} drawShadow={false} flippingTime={0} usePortrait={false} startZIndex={0} autoSize={false} clickEventForward={false} useMouseEvents={false} swipeDistance={0} showPageCorners={false} disableFlipByClick={false} 
              style={{ width: "100px" }}
        >
            {images.map((img, idx) => (
              <div key={idx} className="page">
                <img
                  src={img}
                  alt={`Page ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </HTMLFlipBook>

          <Button style={{ marginTop: "2rem" }} onClick={handleReset}>
            Create Another Story
          </Button>
        </MessageBox>
      )}
    </Container>
  );
};

export default App;
