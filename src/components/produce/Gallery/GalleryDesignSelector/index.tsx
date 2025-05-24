import { Radio, RadioChangeEvent, Space } from "antd";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import {
  CheckerBoardModal,
  GridModal,
  OpenModalButton,
  ThumbnailModal,
} from "./Modals";

const GalleryDesignSelector = () => {
  const { setValue, watch } = useFormContext();

  const handleChange = (e: RadioChangeEvent) => {
    setValue("gallery.type", e.target.value);
  };

  const value = watch("gallery.type");

  const [checkerOpen, setCheckerOpen] = useState<boolean>(false);
  const [gridOpen, setGridOpen] = useState<boolean>(false);
  const [thumbnailOpen, setThumbnailOpen] = useState<boolean>(false);

  return (
    <div style={{ marginBottom: 10 }}>
      <div>형태</div>
      <Radio.Group onChange={handleChange} value={value}
        style={{ display: 'block', width: 'fit-content', margin: 'auto', marginBottom: 16 }}
      >
        <Radio.Button value={1}>그리드</Radio.Button>
        <Radio.Button value={2}>2단 액자</Radio.Button>
        <Radio.Button value={3}>썸네일</Radio.Button>
      </Radio.Group>
      {/* <Radio.Group onChange={handleChange} value={value}>
        <Space direction="horizontal">
          <Radio value={1}>
            그리드&nbsp;
            <OpenModalButton setOpen={setCheckerOpen} />
          </Radio>
          <Radio value={2}>
            2단 액자&nbsp;
            <OpenModalButton setOpen={setGridOpen} />
          </Radio>
          <Radio value={3}>
            썸네일&nbsp;
            <OpenModalButton setOpen={setThumbnailOpen} />
          </Radio>
        </Space>
      </Radio.Group> */}
      <CheckerBoardModal setOpen={setCheckerOpen} open={checkerOpen} />
      <GridModal setOpen={setGridOpen} open={gridOpen} />
      <ThumbnailModal open={thumbnailOpen} setOpen={setThumbnailOpen} />
    </div>
  );
};

export default GalleryDesignSelector;
