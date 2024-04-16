/*
Known bugs:
- Editing wihout a photo wont change into default logo
- Uploading a photo then cancelling the dialog button, keeps that photo. 
This may cause the following update to use that previous photo if no new photo was uploaded
- In the Board section, if the position field is edited, the webpage may not function properly.
So, avoid editing "POSITION" field only in Board section.
You can edit position on Officers, Committee, and Advisors
*/

import React, { useState } from "react";
import { useEffect } from "react";
import "./boardadmin.css";
import EventSubTab from "../eventsAdmin/event-subtab";
import AddModal from "../eventsAdmin/modals/addModal";
import { Tabs, Tab, Button } from "react-bootstrap";
import {
  collectionGroup,
  getDocs,
  query,
  orderBy,
  collection,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { db } from "../../professional-events/firebaseConfig";
import CurrentTab from "./CurrentTab";
import ArchiveTab from "./ArchiveTab";
const BoardAdmin = () => {
  const [currentBoard, setCurrent] = useState(null);
  const [imgArray, setImgLinks] = useState([]);
  const lodash = require("lodash");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const board = query(
          collectionGroup(db, "acm_board"),
          orderBy("year", "asc")
        );
        const boardSnapshot = await getDocs(board);

        if (isMounted) {
          const boardList = [];
          boardSnapshot.forEach((doc) => {
            const boardItem = { id: doc.id, ...doc.data() };
            boardList.push(boardItem);
          });
          const latestBoard = boardList.at(boardList.length - 1);
          setCurrent(latestBoard);

          let imgArray=[];
          const storageObj = getStorage();
          const imgsRef = ref(
            storageObj,
            `${
              "gs://acm-calstatela.appspot.com/Leaders" +
              " " +
              latestBoard.schoolyear
            }`
          );
          listAll(imgsRef)
            .then(async (res) => {
              const downloadPromises = res.items.map(async (itemRef) => {
                const downloadURL = await getDownloadURL(itemRef);
                imgArray.push({link:downloadURL, name:itemRef.name});
              });

              setImgLinks(imgArray);
              await Promise.all(downloadPromises);
            })
            .catch((error) => {
              console.error("Error listing items:", error.message);
            });
        }
      } catch (err) {
        console.log("Error occured when fetching board", err);
      }
    };
    fetchData();

    return () => {
      // Cleanup function to set isMounted to false when the component is unmounted
      isMounted = false;
    };
  }, []);
  console.log("Current Leaders State: ", currentBoard);
  console.log("Current images: ", imgArray);
  const updateLeaderHandler = (newData) => {
    if (newData.section == "board") {
      if (newData.oldLeader.position == "President") {
        updateBoardFirebase(newData, "leaders.board.president")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.president;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "Vice President") {
        updateBoardFirebase(newData, "leaders.board.vicepresident")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.vicepresident;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "Secretary") {
        updateBoardFirebase(newData, "leaders.board.secretary")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.secretary;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "Treasurer") {
        updateBoardFirebase(newData, "leaders.board.treasurer")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.treasurer;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "VP of Internal Affairs") {
        updateBoardFirebase(newData, "leaders.board.vp_affairs1")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.vp_affairs1;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "VP of External Affairs") {
        updateBoardFirebase(newData, "leaders.board.vp_affairs2")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.vp_affairs2;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "Web Master") {
        updateBoardFirebase(newData, "leaders.board.webmaster")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.webmaster;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newData.oldLeader.position == "Project Manager") {
        updateBoardFirebase(newData, "leaders.board.proj_manager1")
          .then((result) => {
            setCurrent((prevLeaders) => {
              const newLeaders = { ...prevLeaders };
              let selectedLeader = newLeaders.leaders.board.proj_manager1;
              selectedLeader.first = newData.leader.first;
              selectedLeader.last = newData.leader.last;
              selectedLeader.position = newData.leader.position;
              selectedLeader.img = result;
              return newLeaders;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else if (newData.section === "officers") {
      updateOfficersCommitteeAdvisors(
        newData,
        currentBoard.leaders.officers,
        "officers"
      );
    } else if (newData.section === "committee") {
      updateOfficersCommitteeAdvisors(
        newData,
        currentBoard.leaders.committee,
        "committee"
      );
    } else {
      updateOfficersCommitteeAdvisors(
        newData,
        currentBoard.leaders.advisors,
        "advisors"
      );
    }
  };

  const updateOfficersCommitteeAdvisors = (newData, section, sectionName) => {
    let memberIndex;
    if (sectionName == "committee" || sectionName == "officers") {
      memberIndex = section[newData.role_group].findIndex((member) =>
        lodash.isEqual(member, newData.oldLeader)
      );
    } else {
      memberIndex = section.findIndex((member) =>
        lodash.isEqual(member, newData.oldLeader)
      );
    }
    OfficerCommitteeAdvisorsFirebase(
      newData,
      sectionName,
      newData.role_group,
      memberIndex
    )
      .then((result) => {
        setCurrent((prevLeaders) => {
          // Create a shallow copy of the leaders object
          const newLeaders = { ...prevLeaders };

          // Navigate to the deep nested structure
          let selectedLeader;
          if (sectionName == "committee") {
            selectedLeader =
              newLeaders.leaders.committee[newData.role_group][memberIndex];
            console.log(selectedLeader);
          } else if (sectionName == "officers") {
            selectedLeader =
              newLeaders.leaders.officers[newData.role_group][memberIndex];
          } else {
            selectedLeader = newLeaders.leaders.advisors[memberIndex];
          }

          // Update the desired property
          selectedLeader.first = newData.leader.first;
          selectedLeader.last = newData.leader.last;
          selectedLeader.position = newData.leader.position;
          selectedLeader.img = result;

          // Return the updated state
          return newLeaders;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateBoardFirebase = async (newInfo, boardPath) => {
    const storage = getStorage();
    try {
      const docRef = doc(db, "acm_board", currentBoard.id);
      const docSnapshot = await getDoc(docRef);
      let leader = newInfo.leader;
      let downloadURL = "";
      if (typeof newInfo.leader.img === "object") {
        // Create a storage reference with the folderName as the path
        const storageRef = ref(
          storage,
          `${
            "gs://acm-calstatela.appspot.com/Leaders" +
            " " +
            currentBoard.schoolyear
          }/${newInfo.leader.img.name}`
        );

        // Upload the file to the specified folder
        await uploadBytes(storageRef, newInfo.leader.img);

        // Get the download URL of the uploaded file
        downloadURL = await getDownloadURL(storageRef);

        console.log("Image uploaded successfully:", downloadURL);

        leader.img = downloadURL;
        console.log(leader);
      } else {
        downloadURL = newInfo.leader.img;
      }
      if (docSnapshot.exists()) {
        // Document exists, proceed with the update
        await updateDoc(docRef, { [boardPath]: leader });
        console.log("Board leader successfully updated!");
      } else {
        console.error("Document does not exist!");
      }
      return downloadURL;
    } catch (error) {
      console.error("Error updating President subobject: ", error);
    }
  };

  const OfficerCommitteeAdvisorsFirebase = async (
    newInfo,
    path,
    role_group,
    memberIndex
  ) => {
    const storage = getStorage();
    try {
      const docRef = doc(db, "acm_board", currentBoard.id);
      const docSnapshot = await getDoc(docRef);
      let leader = newInfo.leader;
      let downloadURL = "";
      if (typeof newInfo.leader.img === "object") {
        // Create a storage reference with the folderName as the path
        const storageRef = ref(
          storage,
          `${
            "gs://acm-calstatela.appspot.com/Leaders" +
            " " +
            currentBoard.schoolyear
          }/${newInfo.leader.img.name}`
        );

        // Upload the file to the specified folder
        await uploadBytes(storageRef, newInfo.leader.img);

        // Get the download URL of the uploaded file
        downloadURL = await getDownloadURL(storageRef);

        console.log("Image uploaded successfully:", downloadURL);

        leader.img = downloadURL;
        console.log(leader);
      } else {
        downloadURL = newInfo.leader.img;
      }
      if (docSnapshot.exists()) {
        const leaders = "leaders";
        if (path === "committee") {
          const currentMembers = docSnapshot.data().leaders[path][role_group];
          currentMembers[memberIndex].first = newInfo.leader.first;
          currentMembers[memberIndex].last = newInfo.leader.last;
          currentMembers[memberIndex].position = newInfo.leader.position;
          currentMembers[memberIndex].img = downloadURL;
          const committee = "committee";
          const updateObject = {
            [`${leaders}.${committee}.${role_group}`]: currentMembers,
          };
          await updateDoc(docRef, updateObject);
        } else if (path === "officers") {
          const currentMembers = docSnapshot.data().leaders[path][role_group];
          currentMembers[memberIndex].first = newInfo.leader.first;
          currentMembers[memberIndex].last = newInfo.leader.last;
          currentMembers[memberIndex].position = newInfo.leader.position;
          currentMembers[memberIndex].img = downloadURL;
          const officers = "officers";
          const updateObject = {
            [`${leaders}.${officers}.${role_group}`]: currentMembers,
          };
          await updateDoc(docRef, updateObject);
        } else {
          const currentMembers = docSnapshot.data().leaders[path];
          currentMembers[memberIndex].first = newInfo.leader.first;
          currentMembers[memberIndex].last = newInfo.leader.last;
          currentMembers[memberIndex].position = newInfo.leader.position;
          currentMembers[memberIndex].img = downloadURL;
          console.log(currentMembers);
          const advisors = "advisors";
          const updateObject = {
            [`${leaders}.${advisors}`]: currentMembers,
          };
          await updateDoc(docRef, updateObject);
        }

        console.log("Board leader successfully updated!");
      } else {
        console.error("Document does not exist!");
      }
      return downloadURL;
    } catch (error) {
      console.error("Error updating leader: ", error);
    }
  };

  const deleteLeaderHandler = (info) => {
    const leader = {
      first: info.first,
      last: info.last,
      position: info.position,
      img: info.img,
    };
    if (info.section === "board") {
      deleteBoardFirestore(leader);
      setCurrent((prevLeaders) => {
        Object.keys(prevLeaders.leaders.board).map((leader) => {
          if (prevLeaders.leaders.board[leader].position == info.position) {
            prevLeaders.leaders.board[leader].first = "Vacant";
            prevLeaders.leaders.board[leader].last = "Position";
            prevLeaders.leaders.board[leader].img = "";
          }
        });
        return prevLeaders;
      });
    } else if (info.section === "committee") {
      setCurrent((prevLeaders) => {
        let memberIndex = -1;
        prevLeaders.leaders.committee[info.role_group].map((leader, index) => {
          if (leader.first === info.first && leader.last === info.last) {
            memberIndex = index;
          }
        });
        console.log(memberIndex);

        // Create a shallow copy of the leaders object
        const newLeaders = { ...prevLeaders };

        // Navigate to the deep nested structure
        const committee = newLeaders.leaders.committee;
        const roleGroup = info.role_group;
        const currentArray = committee[roleGroup];
        // Ensure that the currentArray exists and has elements
        if (currentArray && currentArray.length > 0) {
          // Remove the element at the specified memberIndex
          const updatedArray = [
            ...currentArray.slice(0, memberIndex),
            ...currentArray.slice(memberIndex + 1),
          ];

          deleteOffCommAdvFirestore(info.section, roleGroup, updatedArray);

          // Update the newLeaders object with the modified array
          newLeaders.leaders.committee[roleGroup] = updatedArray;
        }

        // Return the updated state
        return newLeaders;
      });
    } else if (info.section === "officers") {
      console.log("Delete officers");
      setCurrent((prevLeaders) => {
        let memberIndex = -1;
        prevLeaders.leaders.officers[info.role_group].map((leader, index) => {
          if (leader.first === info.first && leader.last === info.last) {
            memberIndex = index;
          }
        });

        // Create a shallow copy of the leaders object
        const newLeaders = { ...prevLeaders };

        // Navigate to the deep nested structure
        const officers = newLeaders.leaders.officers;
        const roleGroup = info.role_group;
        const currentArray = officers[roleGroup];
        // Ensure that the currentArray exists and has elements
        if (currentArray && currentArray.length > 0) {
          // Remove the element at the specified memberIndex
          const updatedArray = [
            ...currentArray.slice(0, memberIndex),
            ...currentArray.slice(memberIndex + 1),
          ];
          deleteOffCommAdvFirestore(info.section, roleGroup, updatedArray);

          // Update the newLeaders object with the modified array
          newLeaders.leaders.officers[roleGroup] = updatedArray;
        }

        // Return the updated state
        return newLeaders;
      });
    } else {
      setCurrent((prevLeaders) => {
        let memberIndex = -1;
        prevLeaders.leaders.advisors.map((leader, index) => {
          if (leader.first === info.first && leader.last === info.last) {
            memberIndex = index;
          }
        });
        console.log(memberIndex);

        // Create a shallow copy of the leaders object
        const newLeaders = { ...prevLeaders };

        // Navigate to the deep nested structure
        const currentArray = newLeaders.leaders.advisors;
        // Ensure that the currentArray exists and has elements
        if (currentArray && currentArray.length > 0) {
          // Remove the element at the specified memberIndex
          const updatedArray = [
            ...currentArray.slice(0, memberIndex),
            ...currentArray.slice(memberIndex + 1),
          ];
          deleteOffCommAdvFirestore(info.section, "", updatedArray);
          // Update the newLeaders object with the modified array
          newLeaders.leaders.advisors = updatedArray;
        }

        // Return the updated state
        return newLeaders;
      });
    }
  };
  const deleteBoardFirestore = async (leaderData) => {
    const docRef = doc(db, "acm_board", currentBoard.id);
    const docSnapshot = await getDoc(docRef);

    try {
      Object.keys(currentBoard.leaders.board).map(async (leaderKey) => {
        if (
          currentBoard.leaders.board[leaderKey].position === leaderData.position
        ) {
          if (docSnapshot.exists()) {
            // Document exists, proceed with the update
            await updateDoc(docRef, {
              [`leaders.board.${leaderKey}`]: {
                first: "Vacant",
                last: "Position",
                position: leaderData.position,
                img: "",
              },
            });
            console.log("Board leader deleted");
          } else {
            console.error("Document does not exist!");
          }
        }
      });
    } catch (error) {
      console.log("Cannot delete leader", error);
    }
  };

  const deleteOffCommAdvFirestore = async (section, role_group, newArray) => {
    const docRef = doc(db, "acm_board", currentBoard.id);
    try {
      if (section === "committee") {
        await updateDoc(docRef, {
          [`leaders.committee.${role_group}`]: newArray,
        });
      } else if (section === "officers") {
        await updateDoc(docRef, {
          [`leaders.officers.${role_group}`]: newArray,
        });
      } else {
        await updateDoc(docRef, { [`leaders.advisors`]: newArray });
      }
    } catch (error) {
      console.error("Document does not exist!", error);
    }
  };

  const addLeaderHandler = (newLeader, section, role_group) => {
    console.log(newLeader, section, role_group);
    let updatedObj;
    if (section === "committee") {
      setCurrent((prevLeaders) => {
        updatedObj = {
          ...prevLeaders,
          leaders: {
            ...prevLeaders.leaders,
            committee: {
              ...prevLeaders.leaders.committee,
              [role_group]: [
                ...prevLeaders.leaders.committee[role_group],
                newLeader,
              ],
            },
          },
        };
        return updatedObj;
      });
    } else if (section === "officers") {
      setCurrent((prevLeaders) => {
        updatedObj = {
          ...prevLeaders,
          leaders: {
            ...prevLeaders.leaders,
            officers: {
              ...prevLeaders.leaders.officers,
              [role_group]: [
                ...prevLeaders.leaders.officers[role_group],
                newLeader,
              ],
            },
          },
        };
        return updatedObj;
      });
    } else {
      console.log("adding advisor: ", newLeader);

      setCurrent((prevLeaders) => {
        updatedObj = {
          ...prevLeaders,
          leaders: {
            ...prevLeaders.leaders,
            advisors: [...prevLeaders.leaders.advisors, newLeader],
          },
        };
        return updatedObj;
      });
    }
  };

  return (
    <div class="container main-boardadmin mt-5 pt-5">
      {currentBoard && imgArray && (
        <>
          <h1 align="center">Board page</h1>

          <Button className="mr-3 mb-3">Add new empty board</Button>
          <Tabs id="sub-tabs" className="mb-3 event-tabs">
            <Tab eventKey="current" title="Current">
              <CurrentTab
                data={currentBoard}
                imgs={imgArray}
                onUpdate={updateLeaderHandler}
                onDelete={deleteLeaderHandler}
                onAdd={addLeaderHandler}
              />
            </Tab>
            <Tab eventKey="archive" title="Archive">
              <ArchiveTab />
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default BoardAdmin;
