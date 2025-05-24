import data from "@/assets/review/list.json";
import { Review } from "@/types/types";
import { getHiddenUserName, toLocaleString } from "@/util/functions";
import { Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ReviewCarousel = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides
      spaceBetween={30}
      direction="horizontal"
      style={{ overflow: "hidden" }}
    >
      {data.list.map((review: Review, idx: number) => {
        const { userName, registerDate, text } = review;

        return (
          <SwiperSlide key={idx} style={{ display: "inline", width: "70vw" }}>
            <Card
              size="small"
              title={getHiddenUserName(userName)}
              extra={toLocaleString(registerDate)}
            >
              <div style={{ height: 90 }}>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {text}
                </p>
              </div>
            </Card>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ReviewCarousel;
