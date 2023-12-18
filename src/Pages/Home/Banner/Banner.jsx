import video from "../../../assets/card_video.mp4";

const Banner = () => {
  return (
    <div className="relative flex justify-center items-center overflow-ellipsis h-[100vh] lg:h-[90vh]">
      <div className="w-full h-full relative">
        <video
          className="w-full h-full object-cover"
          src={video}
          muted
          autoPlay={"autoplay"}
          preload="auto"
          loop
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      <div className="absolute top-[40%] text-center w-full">
        <h1
        //   style={{
        //     backgroundImage:
        //       "background-image: linear-gradient(to right top, #482885, #52469a, #5f62ad, #707dbe, #8598ce, #8aa6d4, #94b4d8, #a1c1db, #a2c4d5, #a6c6cf, #adc7ca, #b5c7c6);",
        //   }}
          className="text-transparent bg-clip-text  bg-gradient-to-r from-purple-400 via-red-300 to-purple-400 text-2xl lg:text-5xl md:w-9/12 lg:w-6/12 mx-auto uppercase font-bold text-white tracking-wider leading-10"
        >
          The easiest way to share your details
        </h1>

        <p className="text-transparent bg-clip-text  bg-gradient-to-r from-purple-50 via-red-100 to-purple-50 mt-5 lg:my-10  md:w-9/12 lg:w-5/12  mx-auto text-white tracking-wider">
          A digital business card allows you to instantly share who you are,
          with anyone, wherever you go.
        </p>
      </div>
    </div>
  );
};

export default Banner;
