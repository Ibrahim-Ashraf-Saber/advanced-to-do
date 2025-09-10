import img from "../assets/grow.svg";

function DashbordPrograss({ name, status }) {
  return (
    <>
      <img src={img} alt="Motivation" className="w-full max-w-xs mb-3" />

      <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-center">
        Keep it up, {name}! 🚀
      </h2>

      <p className="text-base lg:text-lg mb-6 text-center">
        You’ve completed {status.complete || 0} out of {status.total || 0}{" "}
        tasks.
        <br />
        Stay focused and push a little more! 💪
      </p>

      <div className="w-full bg-white/30 rounded-full h-4 mb-3">
        <div
          className="bg-green-400 h-4 rounded-full transition-all duration-500"
          style={{
            width: `${
              status.total ? (status.complete / status.total) * 100 : 0
            }%`,
          }}
        ></div>
      </div>

      <span className="text-sm lg:text-base">
        Progress:{" "}
        {status.total ? Math.round((status.complete / status.total) * 100) : 0}%
      </span>
    </>
  );
}

export default DashbordPrograss;
