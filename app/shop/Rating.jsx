import { Star, StarHalf } from "phosphor-react";

const Rating = ({ value, text }) => {
  return (
    <>
      <div className="hidden  md:grid grid-cols-2 ">
        <div className="flex pt-1">
          <div className=" h-3 w-3 sm:h-4 sm:w-4">
            {value >= 1 ? (
              <div className="w-auto h-auto">
                <Star size={16} color="#ddd45a" weight="fill" />
              </div>
            ) : value >= 0.5 ? (
              <div className="w-auto h-auto">
                <StarHalf size={16} color="#ddd45a" weight="fill" />
              </div>
            ) : (
              <div className="w-auto h-auto">
                <Star size={16} color="#ddd45a" />
              </div>
            )}
          </div>
          <div className="h-3 w-3 sm:h-4 sm:w-4">
            {value >= 2 ? (
              <Star size={16} color="#ddd45a" weight="fill" />
            ) : value >= 1.5 ? (
              <StarHalf size={16} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={16} color="#ddd45a" />
            )}
          </div>
          <div className="h-3 w-3 sm:h-4 sm:w-4">
            {value >= 3 ? (
              <Star size={16} color="#ddd45a" weight="fill" />
            ) : value >= 2.5 ? (
              <StarHalf size={16} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={16} color="#ddd45a" />
            )}
          </div>
          <div className="h-3 w-3 sm:h-4 sm:w-4">
            {value >= 4 ? (
              <Star size={16} color="#ddd45a" weight="fill" />
            ) : value >= 3.5 ? (
              <StarHalf size={16} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={16} color="#ddd45a" />
            )}
          </div>
          <div className=" h-3 w-3 sm:h-4 sm:w-4">
            {value >= 5 ? (
              <Star size={16} color="#ddd45a" weight="fill" />
            ) : value >= 4.5 ? (
              <StarHalf size={16} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={16} color="#ddd45a" />
            )}
          </div>
        </div>

        <div className="text-sm">{text && text}</div>
      </div>
      <div className="md:hidden flex flex-col ">
        <div className="flex  pt-1 gap-1">
          <div className=" h-3 w-3 sm:h-4 sm:w-4">
            {value >= 1 ? (
              <div className="w-auto h-auto">
                <Star size={18} color="#ddd45a" weight="fill" />
              </div>
            ) : value >= 0.5 ? (
              <div className="w-auto h-auto">
                <StarHalf size={18} color="#ddd45a" weight="fill" />
              </div>
            ) : (
              <div className="w-auto h-auto">
                <Star size={18} color="#ddd45a" />
              </div>
            )}
          </div>
          <div className="h-3 w-3 sm:h-4 sm:w-4">
            {value >= 2 ? (
              <Star size={18} color="#ddd45a" weight="fill" />
            ) : value >= 1.5 ? (
              <StarHalf size={18} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={18} color="#ddd45a" />
            )}
          </div>
          <div className="h-3 w-3 sm:h-4 sm:w-4">
            {value >= 3 ? (
              <Star size={18} color="#ddd45a" weight="fill" />
            ) : value >= 2.5 ? (
              <StarHalf size={18} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={18} color="#ddd45a" />
            )}
          </div>
          <div className="h-3 w-3 sm:h-4 sm:w-4">
            {value >= 4 ? (
              <Star size={18} color="#ddd45a" weight="fill" />
            ) : value >= 3.5 ? (
              <StarHalf size={18} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={18} color="#ddd45a" />
            )}
          </div>
          <div className=" h-3 w-3 sm:h-4 sm:w-4">
            {value >= 5 ? (
              <Star size={18} color="#ddd45a" weight="fill" />
            ) : value >= 4.5 ? (
              <StarHalf size={18} color="#ddd45a" weight="fill" />
            ) : (
              <Star size={18} color="#ddd45a" />
            )}
          </div>
        </div>

        <div className="text-sm">{text && text}</div>
      </div>
    </>
  );
};

export default Rating;
