import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function HerbDetail(){
    const myParams = useParams();
    const hbId = myParams.hbId;
    const [hbData, setHerbData] = useState({
        hbName :'', 
        hbDesc :'', 
        hbCate :'', 
        hbProp :'', 
        hbSupp :'',
    });

    useEffect(() => {
        try {
            const fetchHerbData = async () => {
                const hbData = await fetch(`http://localhost:3002/api/getOneHbs${hbId}`);
                if (hbData.ok) {
                    const hbJson = await hbData.json();
                    setHerbData(hbJson);
                    console.log(hbJson);
                } else {
                    alert('[ERR] Failed to loaded data.');
                }
            }

            fetchHerbData().catch(console.error);
        } catch (error) {
            alert('[ERR] An error occurred while loading the data.');
        }
    }, []);

    return (
    <div className="m-3">
        <a href='font-bold text -lg mb-4'>[ ข้อมูลสมุนไพร ]</a>
        <h1 className="font-bold">รายละเอียดสมุนไพร</h1>
        {
            <div key={hbId}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสมุนไพร: {''}<br/>
                    รายละเอียด: {''}<br/>
                    หมวดหมู่: {''}<br/>
                    สรรพคุณ: {''}<br/>
                    ผู้ผลิต: {''}<br/>
                </div>
            </div>
        }
        <a href='/lab02/herbLists'>[ ย้อนกลับ ]</a>
    </div>
    );
}