import React, { useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import { db } from "../../professional-events/firebaseConfig";
import {
  collection,
  documentId,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// import ProjectAddModel from "./modals/projectAddModel";
import ProjectSubTab from "./project-subtab";

const ProjectsAdmin = () => {
  const [activeTab, setActiveTab] = useState("semester"); //Sets active tab
  // const [addModel, setAddModel] = useState(false);

  const [currentProjects, setCurrentProjects] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);

  // const currentProjectsTemp = [
  //   {
  //     _id: 0,
  //     altText: "BP Event Name",
  //     imgUrl: dummyBegImg,
  //   },
  //   {
  //     _id: 1,
  //     altText: "AP Event Name",
  //     imgUrl: dummyAdImg,
  //   },
  // ];

  // const archivedProjects = [
  //   {
  //     altText: "Event 1",
  //     imgUrl: "placeholder",
  //   },
  //   {
  //     altText: "Event 2",
  //     imgUrl: "placeholder",
  //   },
  //   {
  //     altText: "Event 3",
  //     imgUrl: "placeholder",
  //   },
  // ];

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "project_workshop");
        const countProjects = await getCountFromServer(collectionRef);
        const latestDoc = countProjects.data().count;
        const curProjects = query(
          collectionRef,
          where(documentId(), "==", latestDoc.toString())
        );

        const archProjects = query(
          collectionRef,
          where(documentId(), "!=", latestDoc.toString())
        );
        const proSnap = await getDocs(curProjects);
        const archSnap = await getDocs(archProjects);
        const curGroup = [];
        const archGroup = [];

        if (isMounted) {
          //beginner snap
          proSnap.forEach((doc) => {
            const uProject = {};

            var skillsArr = doc.data().level.beginners.skills;
            skillsArr = skillsArr.join(", ");

            uProject["level"] = "beginners";
            uProject["imgUrl"] = doc.data().level.beginners.flyer;
            uProject["title"] = doc.data().level.beginners.title;
            uProject["id"] = doc.id;
            uProject["leaders"] = doc.data().level.beginners.leaders;
            uProject["skills"] = skillsArr;
            uProject["semester"] = doc.data().level.semester;
            uProject["archived"] = false
            curGroup.push(uProject);
          });

          //advanced snap
          proSnap.forEach((doc) => {
            const uProject = {};

            var skillsArr = doc.data().level.advanced.skills;
            skillsArr = skillsArr.join(", ");

            uProject["level"] = "advanced";
            uProject["imgUrl"] = doc.data().level.advanced.flyer;
            uProject["title"] = doc.data().level.advanced.title;
            uProject["id"] = doc.id;
            uProject["leaders"] = doc.data().level.advanced.leaders;
            uProject["skills"] = skillsArr;
            uProject["semester"] = doc.data().level.semester;
            uProject["archived"] = false
            curGroup.push(uProject);
          });

          //archived benginners snap
          archSnap.forEach((doc) => {

            var skillsArr = doc.data().level.beginners.skills;
            skillsArr = skillsArr.join(", ");

            const uProject = {};
            uProject["level"] = "beginners";
            uProject["imgUrl"] = doc.data().level.beginners.flyer;
            uProject["title"] = doc.data().level.beginners.title;
            uProject["id"] = doc.id;
            uProject["leaders"] = doc.data().level.beginners.leaders;
            uProject["skills"] = skillsArr;
            uProject["semester"] = doc.data().level.semester;
            uProject["archived"] = true
            archGroup.push(uProject);
          });
          //archived advanced snap
          archSnap.forEach((doc) => {
            const uProject = {};

            var skillsArr = doc.data().level.advanced.skills;
            skillsArr = skillsArr.join(", ");

            uProject["level"] = "advanced";
            uProject["imgUrl"] = doc.data().level.advanced.flyer;
            uProject["title"] = doc.data().level.advanced.title;
            uProject["id"] = doc.id;
            uProject["leaders"] = doc.data().level.advanced.leaders;
            uProject["skills"] = skillsArr;
            uProject["semester"] = doc.data().level.semester;
            uProject["archived"] = true
            archGroup.push(uProject);
          });

          setCurrentProjects(curGroup);
          setArchivedProjects(archGroup);

          // console.log(currentProjectsTemp);
        }
      } catch (err) {
        console.log("Error when fetching events", err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  });

  return (
    <>
      <Container className="mt-5 pt-5">
        <h1>Projects</h1>

        {/* <Button className="position-absolute" style={{ marginLeft: "90vw" }}>
          Add a Project
        </Button> */}
        {/* <ProjectAddModel show={addModel} onHide={() => setAddModel(false)} /> */}
        <Tabs
          defaultActiveKey={activeTab}
          variant="pills"
          id="sub-tabs"
          className="mb-3 event-tabs"
        >
          <Tab eventKey="semester" title="Semester">
            <ProjectSubTab data={currentProjects} />
          </Tab>
          <Tab eventKey="archived" title="Archived">
            <ProjectSubTab data={archivedProjects} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default ProjectsAdmin;
