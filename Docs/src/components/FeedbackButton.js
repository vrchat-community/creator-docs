import { useYbugApi } from "ybug-react";

// This component open the Ybug feedback widget if a user pressed the feedback button.
// Unlike the regular widget, this button can be placed anywhere on a page.
export default function FeedbackButton() {
  const YbugContext = useYbugApi();
  const onClick = () => {
    if (YbugContext.Ybug) {
      YbugContext.Ybug.open("feedback");
    }
  };

  return <button onClick={onClick}>Feedback</button>;
}
