import "./member.scss";
import { useEffect, useState } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";

const Member = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    //https://mocki.io/v1/27621afc-0cd4-4742-b6d3-cc738209952b
    //https://2188-118-189-129-143.ngrok-free.app/auditors
    fetch("https://mocki.io/v1/27621afc-0cd4-4742-b6d3-cc738209952b", {
      method: "GET", // or 'POST', 'PUT', etc., depending on your API endpoint
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setMembers(json);
        console.log("abc" + json);
      });
  }, []);

  console.log(members);

  return (
    <div>
      <PageTitle>Member</PageTitle>
      <table className="member__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.Auditor_ID}>
              <td>{member.Auditor_ID}</td>
              <td>{member.Auditor_Name}</td>
              <td>{member.Auditor_Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member;
