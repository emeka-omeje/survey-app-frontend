import CreateHeaderNavigation from "./CreateHeaderNavigation";
import style from "./surveyComponent.module.css";
import { useAppContext } from "../../Utils/AppContext";

const CreateHeaderComponent = () => {
  // const navigationItemArray = [
  //     {to: "/surveys/create", label: "Builder"},
  //     {to: "/surveys/logic", label: "Logic"},
  //     {to: "/surveys/distribute", label: "Distribute"},
  //     {to: "/surveys/feedbacks", label: "Feedbacks"},
  // ]

  const navigationStringArray = ["Builder", "Logic", "Permission"];
  //   const [buttonName, setButtonName] = React.useState("Builder");

  const { createNavBTNLabel, setCreateNavBTNLabel, setPublishingStatus, } = useAppContext();

  const handleManualPublishAction = (action: string) => {
    setCreateNavBTNLabel(action)
    setPublishingStatus("Publishing");

    try {
      if (!navigator.onLine) throw new Error("You are offline. Please check your internet connection."); 
      // I will still need to confirm if this above logic needs modification to include a queue system for offline data saving.

      // The logic that should be here below should be the one that sends to backend API to save survey data to server.
      // The data should be removed from the indexDB storage and the localStorage queue.
      // Also, the dirty status should be changed from true to false.
      setPublishingStatus('Published');
    } catch (err) {
    console.error('Manual save failed:', err);
    // enqueueSync(surveyId, surveyData); This should add the surveyData back to queue until network is restored
    setPublishingStatus('Offline');
    }
  }

  return (
    <section className={style.createHeader_main}>
      <div className={style.createHeader_nav}>
        {navigationStringArray.map((navItem, index) => (
          <CreateHeaderNavigation
            key={index}
            Label={navItem}
            isActive={createNavBTNLabel === navItem}
            setButtonName={setCreateNavBTNLabel}
          />
        ))}
      </div>
      <div className={style.createHeader_nav}>
        <button
          className={`${style.createHeaderNav_Item} ${style.createHeaderNav_Item_prevBTN}`}
          onClick={() => setCreateNavBTNLabel("Preview")}
        >
          Preview
        </button>
        <button
          className={`${style.createHeaderNav_Item} ${style.createHeaderNav_Item_prevBTN}`}
          onClick={() => handleManualPublishAction("Publish")}
        >
          Publish
        </button>
      </div>
    </section>
  );
};

export default CreateHeaderComponent;
