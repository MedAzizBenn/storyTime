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
  Overlay,
  BookContainer,
  LoadingSpinner,
  PageCounter,
  NavigationButton,
  CloseButton,
  BackgroundAnimation
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
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showFullscreenBook, setShowFullscreenBook] = useState<boolean>(false);

  // Instead of generating, we use fixed images in /public/images
  const [images, setImages] = useState<string[]>([
    "/images/page1.jpg",
    "/images/page2.jpg",
    "/images/page3.jpg",
    "/images/page4.jpg",
    "/images/page5.jpg",
  ]);

  const [storyTexts, setStoryTexts] = useState<string[]>([
    "Once upon a time, in a magical forest, there lived a curious rabbit named Remy.",
    "Remy loved exploring and one day found a shimmering, glowing carrot unlike any he had ever seen.",
    "With a single nibble, Remy discovered he could hop higher than the tallest trees!",
    "He embarked on wonderful adventures, visiting cloud castles and making friends with birds.",
    "Remy learned that magic was wonderful, but the real magic was in sharing adventures with friends."
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (theme.trim() === "") {
      alert("Please enter a story theme!");
      return;
    }
    
    setIsGenerating(true);
    setSubmitted(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setStoryTitle(`The ${style} tale of ${theme}`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setTheme("");
    setSubmitted(false);
    setStoryTitle("");
    setCurrentPage(0);
    setShowFullscreenBook(false);
  };

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, images.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const toggleFullscreen = () => {
    setShowFullscreenBook(!showFullscreenBook);
  };

  return (
    <Container>
      <BackgroundAnimation />
      <Title>Magic Tale Maker</Title>
      
      {!submitted ? (
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>✨ Enter your story theme:</span>
            <Input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. A rabbit who finds a magic carrot"
              required
            />
          </Label>

          <Label>
            <span>🎨 Choose story style:</span>
            <Select value={style} onChange={(e) => setStyle(e.target.value)}>
              {storyStyles.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Label>

          <Button type="submit">
            Create My Story
          </Button>
        </Form>
      ) : (
        <MessageBox>
          {isGenerating ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <LoadingSpinner />
              <h3>Creating your magical story...</h3>
              <p>Our story elves are working hard!</p>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: "1rem", textAlign: 'center' }}>{storyTitle}</h2>
              
              <div style={{ position: 'relative', margin: '0 auto', maxWidth: '400px' }}>
                {/* <BookContainer>
                  <HTMLFlipBook
                    width={300}
                    height={450}
                    size="stretch"
                    minWidth={300}
                    maxWidth={600}
                    minHeight={400}
                    maxHeight={800}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="storybook"
                    onFlip={(e) => setCurrentPage(e.data)}
                    style={{ margin: '0 auto' }}
                  >
                    {images.map((img, idx) => (
                      <div key={idx} className="page">
                        <div className="page-content">
                          <img
                            src={img}
                            alt={`Page ${idx + 1}`}
                            style={{ width: "100%", height: "60%", objectFit: "cover" }}
                          />
                          <div className="story-text">
                            {storyTexts[idx]}
                          </div>
                          <div className="page-number">
                            {idx + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </HTMLFlipBook>
                </BookContainer>
                 */}
                <PageCounter>
                  Page {currentPage + 1} of {images.length}
                </PageCounter>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1rem' }}>
                  <NavigationButton onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                  </NavigationButton>
                  <NavigationButton onClick={toggleFullscreen}>
                    {showFullscreenBook ? 'Close Book' : 'Read Fullscreen'}
                  </NavigationButton>
                  <NavigationButton onClick={nextPage} disabled={currentPage === images.length - 1}>
                    Next
                  </NavigationButton>
                </div>
              </div>

              <Button style={{ marginTop: "2rem" }} onClick={handleReset}>
                Create Another Story
              </Button>
            </>
          )}
        </MessageBox>
      )}
      
      {showFullscreenBook && (
        <Overlay>
          <div style={{ position: 'relative', width: '90vw', height: '90vh' }}>
            <CloseButton onClick={toggleFullscreen}>×</CloseButton>
            {/* <HTMLFlipBook
              width={550}
              height={700}
              size="stretch"
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              className="storybook-fullscreen"
              startPage={currentPage}
            >
              {images.map((img, idx) => (
                <div key={idx} className="page">
                  <div className="page-content">
                    <img
                      src={img}
                      alt={`Page ${idx + 1}`}
                      style={{ width: "100%", height: "70%", objectFit: "cover" }}
                    />
                    <div className="story-text">
                      {storyTexts[idx]}
                    </div>
                    <div className="page-number">
                      {idx + 1}
                    </div>
                  </div>
                </div>
              ))}
            </HTMLFlipBook> */}
          </div>
        </Overlay>
      )}
    </Container>
  );
};

export default App;