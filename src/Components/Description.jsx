import DescriptionBG from './Assets/images/DescriptionBG.png';

function DescriptionBox() {
  return (
      <div className="relative w-full h-[100vh]">
          <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                  backgroundImage: `url(${DescriptionBG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
              }}
          />
          <div className="relative z-10 w-full h-full bg-gradient-to-r from-black to-transparent text-white p-6 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-2">Enhance Your Mood</h2>
              <p className="text-lg">
                  Welcome to our innovative mood enhancement platform!<br/> This dynamic system intuitively detects your emotional state<br/> through advanced technology. Whether you're feeling joyful, down,<br/> or somewhere in between, our personalized recommendations for<br/> music, memes, and motivational content are designed to uplift and inspire you. Experience a <br/>tailored journey that adapts to your mood and enhances your well-being like never before!
              </p>
          </div>
      </div>
  );
}

export default DescriptionBox;


