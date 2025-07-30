import LetterGlitch from "../reactBits/LetterGlitch.jsx";
import TextType from "../reactBits/TextType";

const LostPage = () => {
  return (
    <div className="w-full h-screen">
      {" "}
      {/* Full viewport */}
      <LetterGlitch
        glitchSpeed={60}
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}>
        <TextType
          text={["Page Not Found!", "You have lost your way!"]}
          as="h1"
          typingSpeed={100}
          pauseDuration={2000}
          loop={true}
          textColors={"white"}
          className="text-2xl md:text-4xl font-bold text-yellow-50"
          cursorCharacter="|"
        />
      </LetterGlitch>
    </div>
  );
};

export default LostPage;
