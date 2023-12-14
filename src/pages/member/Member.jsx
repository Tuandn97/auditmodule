import './member.scss'
import { useEffect, useState } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";

const Member = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                setMembers(json);
            });
    }, []);

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
                    <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Member;