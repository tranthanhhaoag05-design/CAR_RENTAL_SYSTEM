import { useRef, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Anh Hải",
    address: "Thủ Dầu Một, Bình Dương",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Dịch vụ tốt. Hỗ trợ khách hàng nhanh và rất nhiệt tình.",
  },
  {
    id: 2,
    name: "Anh Nguyên",
    address: "Dĩ An, Bình Dương",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "Đặt xe nhanh. Nhận xe thuận tiện. Xe sạch và đi rất ổn.",
  },
  {
    id: 3,
    name: "Anh Khôi",
    address: "TP. Hồ Chí Minh",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    content: "Giá cả hợp lý, thời gian linh động, thủ tục khá nhanh.",
  },
  {
    id: 4,
    name: "Anh Dũng",
    address: "Thuận An, Bình Dương",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "Hỗ trợ đặt xe nhanh. Nhân viên giải thích rõ ràng, dễ hiểu.",
  },
  {
    id: 5,
    name: "Anh Trường",
    address: "Quận 7, TP. Hồ Chí Minh",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    content: "Xe đẹp, sạch, đúng mô tả. Thủ tục nhận và trả xe đơn giản.",
  },
  {
    id: 6,
    name: "Chị Linh",
    address: "Biên Hòa, Đồng Nai",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Mình đặt xe cho gia đình đi chơi cuối tuần, trải nghiệm rất tốt.",
  },
  {
    id: 7,
    name: "Anh Phúc",
    address: "Đà Nẵng",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    content: "Giao xe đúng giờ, xe vận hành ổn, hỗ trợ khách hàng rất nhanh.",
  },
  {
    id: 8,
    name: "Chị Vy",
    address: "Nha Trang",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    content: "Giá hợp lý, có nhiều lựa chọn xe. Mình sẽ tiếp tục sử dụng.",
  },
];

function Stars() {
  return <div className="review-stars">★★★★★</div>;
}

export default function CustomerReviews() {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const dots = 5;

  const handleDotClick = (index) => {
    const slider = scrollRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const target = (maxScroll / (dots - 1)) * index;

    slider.scrollTo({
      left: target,
      behavior: "smooth",
    });

    setActiveDot(index);
  };

  const handleScroll = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }

    const progress = slider.scrollLeft / maxScroll;
    const index = Math.round(progress * (dots - 1));
    setActiveDot(index);
  };

  return (
    <section className="customer-reviews">
      <h2 className="section-title">Đánh giá khách hàng</h2>

      <div className="reviews-scroll-wrap" ref={scrollRef} onScroll={handleScroll}>
        <div className="reviews-grid horizontal-scroll">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <Stars />
              <p className="review-content">{review.content}</p>

              <div className="review-user">
                <img src={review.avatar} alt={review.name} />
                <div>
                  <h4>{review.name}</h4>
                  <span>{review.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="review-dots">
        {Array.from({ length: dots }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${activeDot === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Chuyển đến nhóm đánh giá ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}