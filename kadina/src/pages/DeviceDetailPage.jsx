import { useParams } from "react-router-dom";
import DevicePageTemplate from "../components/technology/DevicePageTemplate";
import { deviceDetailsBySlug } from "../data/devices";

export default function DeviceDetailPage() {
  const { deviceSlug } = useParams();
  const device = deviceDetailsBySlug[deviceSlug];

  return <DevicePageTemplate device={device} />;
}
