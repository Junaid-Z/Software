import { useEffect, useState } from "react";
import SMTable from "../../components/SMTable/SMTable";
import { subscribe } from "../../Firebase/FirebaseFunctions";
import '../../Style/Students.css'
function StudentsList() {
    let [pageIsLoading, setPageIsLoading] = useState(true);
    let [data, setData] = useState([])
    console.log(data)
    useEffect(() => {
        subscribe('Users', (snapshot) => {
            setData(Object.values(snapshot.val()))
        })
        setPageIsLoading(false);
    }, [])
    return (
        <div id="students">
            {pageIsLoading ?
                <img
                    style={{
                        height: '100px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        position: 'absolute'
                    }}
                    src="https://i.gifer.com/ZZ5H.gif"
                    alt="" />
                :
                <SMTable
                    searchBarStyle={{ maxWidth: '400px', marginLeft: 'auto', position: 'sticky', top: '0px' }}
                    limit={40}
                    colStyle={{ borderWidth: "1px", borderStyle: "solid", borderColor: "#009fff9e" }}
                    style={{ width: "100%" }}
                    cols={[
                        { value: "name", displayName: "Name" },
                        { value: "email", displayName: "Email" },
                        { value: "CNIC", displayName: "CNIC" },
                        { value: "role", displayName: "Role" }
                    ]}
                    data={data} />
            }
        </div>
    )
}
export default StudentsList;