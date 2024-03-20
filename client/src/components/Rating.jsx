const Rating = (props) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
        if (index <= Math.floor(props.rating)-1) {
            return <i key={index} className="fa-solid fa-star"></i>
        } else if (props.rating % 1 !== 0 && index === Math.floor(props.rating)) {
            return <i key={index+1} className="fa-solid fa-star-half-stroke"></i>
        } else {
            return <i key={index+1} className="fa-regular fa-star"></i>
        }
    });

    return (
        <span className="text-xs sm:text-sm flex flex-row items-center text-blue-600">
            {stars}
            (67)
        </span>
    )
  }

export default Rating