interface MedalProps {
  position: number;
}

const Medal: React.FC<MedalProps> = ({ position }) => {
  return (
    <div className="relative">
      <svg
        viewBox="-102.4 -102.4 1228.80 1228.80"
        className="pt-4"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        transform="rotate(0)"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M401.92 888.32L371.2 750.08l-130.56 57.6 175.36-348.16 161.28 80.64z"
            fill="#e6498b"
          ></path>
          <path
            d="M396.8 926.72L362.24 768l-148.48 66.56 197.12-392.96 184.32 92.16L396.8 926.72z m-16.64-194.56l26.88 119.04 153.6-305.92L422.4 476.16 268.8 782.08l111.36-49.92z"
            fill="#ffffff"
          ></path>
          <path
            d="M624.64 888.32l30.72-138.24 130.56 57.6-175.36-348.16-161.28 80.64z"
            fill="#e6498b"
          ></path>
          <path
            d="M629.76 926.72L432.64 533.76l184.32-92.16 197.12 392.96L665.6 768l-35.84 158.72zM467.2 545.28l153.6 305.92 26.88-119.04 111.36 49.92-153.6-305.92-138.24 69.12z"
            fill="#ffffff"
          ></path>
          <path
            d="M719.36 609.28l-96 11.52-70.4 65.28-84.48-46.08-96 11.52-40.96-88.32-84.48-47.36 19.2-94.72-40.96-87.04 70.4-66.56 19.2-94.72 96-11.52 70.4-66.56 84.48 47.36 96-11.52 40.96 88.32 84.48 47.36-19.2 94.72 40.96 87.04-70.4 66.56z"
            fill="#50a1cc"
          ></path>
          <path
            d="M554.24 702.72l-89.6-49.92-101.12 12.8-42.24-92.16-89.6-49.92 19.2-99.84-42.24-92.16 74.24-69.12 19.2-99.84 101.12-12.8 74.24-69.12 89.6 49.92 101.12-12.8 42.24 92.16 89.6 49.92-17.92 98.56 42.24 92.16-74.24 69.12-19.2 99.84-101.12 12.8-75.52 70.4z m-83.2-76.8l79.36 44.8 66.56-62.72 90.88-11.52 17.92-89.6 66.56-62.72-38.4-83.2 17.92-89.6-80.64-44.8-38.4-83.2-89.6 12.8-80.64-44.8-66.56 62.72-90.88 11.52-17.92 89.6-66.56 62.72 38.4 83.2-17.92 89.6 80.64 44.8 38.4 83.2 90.88-12.8z"
            fill="#ffffff"
          ></path>
          <path
            d="M353.28 390.4a166.4 166.4 0 1 0 332.8 0 166.4 166.4 0 1 0-332.8 0Z"
            fill="#FAF1C7"
          ></path>
          <path
            d="M519.68 569.6c-98.56 0-179.2-80.64-179.2-179.2s80.64-179.2 179.2-179.2 179.2 80.64 179.2 179.2c-1.28 98.56-80.64 179.2-179.2 179.2z m0-332.8c-84.48 0-153.6 69.12-153.6 153.6s69.12 153.6 153.6 153.6 153.6-69.12 153.6-153.6c-1.28-84.48-69.12-153.6-153.6-153.6z"
            fill="#ffffff"
          ></path>
        </g>
      </svg>
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-extrabold">
        {position}
      </h1>
    </div>
  );
};

export default Medal;