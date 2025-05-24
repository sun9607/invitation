import { FormTextArea, InputGroup } from "@/components/produce";
import { Divider } from "antd";
import { useFormContext } from "react-hook-form";
import VideoUploader from "./VideoUploader";
import FieldInput from "@/components/produce/FieldInput";

const Video = () => {
  const { setValue, watch } = useFormContext();

  const handleOnOffChange = (checked: boolean) => {
    setValue("video.useYn", checked);
  };

  const onoff = watch("video.useYn");

  return (
    <InputGroup
      label="동영상"
      onoff
      onoffChange={handleOnOffChange}
      checked={onoff}
    >
      {onoff && (
        <>
          <FormTextArea
            name="video.title"
            placeholder="영상위에 글이 게시됩니다."
          />
          <Divider />
          {/* <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>
            <VideoUploader/>
          </div> */}
          {/* <Divider plain>or</Divider> */}
          <FieldInput
            name="video.link"
            placeholder="영상링크 공유"
          />
          <ul style={{ padding: "0 0 0 12px", fontSize: "min(14px, 2.5vw)" }}>
            <li>
              영상은 공유링크(복사한 URL) 만 사용가능하며,<br />무단 도용된 영상을 업로드 하면 안됩니다.
            </li>
            <li>
              유튜브 또는 인스타 공식채널(가수, 방송사, 저작권자, 제작자 본인)<br />
              의 제공된 컨텐츠만 가능합니다.
            </li>
            <li>
              타인의 저작권을 침해하는 영상을 공유하지 않습니다.<br />
              (불법도용된 영상)
            </li>
            <li>
              위 내용을 확인 후 저작권 문제가 없는 영상만 등록해 주세요
            </li>
          </ul>
          <div>
            ※ 영상링크를 원하지 않으시면 동영상 오른쪽<br />
            　 옆 체크바를 클릭하세요
          </div>
        </>
      )}
    </InputGroup>
  );
};

export default Video;
