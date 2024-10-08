import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { json } from "body-parser";

export default function HerbEditForm(){
    const navigate = useNavigate();
    const myParams = useParams();
    const hbId = myParams.hbId;
    const [hbData, setHerbData] = useState({
        hbName :'', 
        hbDesc :'', 
        hbCate :'', 
        hbProp :'', 
        hbSupp :'',
    });
    const [cateOption, setCateOption] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHerbData({
          ...hbData,
          [name]: value
        });
    };

    useEffect(() => {
        try {
            const fetchHerbData = async () => {
                const hbData = await fetch(`http://localhost:3002/api/getoneHbs/${hbId}`);
                if (hbData.ok) {
                    const hbJson = await hbData.json();
                    setHerbData(hbJson);
                    setCateOption(hbJson.hbCate);
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

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(confirm('Confirm the information update?')){
        const form = e.target;
        const formData = new FormData(form);  
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        
        try {
            const resHerb = await fetch('http://localhost:3002/api/updateHbs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
    
            if(resHerb.ok){
                const myJson = await resHerb.json();
                alert(`${myJson.message}`);
                navigate('/lab02/herbLists');
            }else{
                alert('[ERR] Failed to update the form.');
            }
        } catch (error) {
            alert('[ERR] An error occurred while updatting the form.');
        }
        return true;
      }
    }

    return (
        <div className="m-3">
            <a href='herbDetail/:hbId'>[ ข้อมูลสมุนไพร ]</a>
            <h1 className="herbForm">อัปเดตข้อมูลสมุนไพร</h1>
            <form method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="hbId" value={hbData.hbCate} />
            <label>ชื่อสมุนไพร (*)</label>:<br />
            <input type="text" name="hbName" id="hbName" className="border rounded-lg p-2 w-1/2"
            onChange={handleChange} value={hbData.hbName} required /><br />
            <label>รายละเอียด</label>:<br />
            <textarea rows={3} cols={50} name="hbDesc" id="hbDesc" className="border rounded-lg p-2 w-1/2"
                onChange={handleChange} value={hbData.hbDesc}
            /><br />
            <label>หมวดหมู่ (*)</label>:<br />
            <select name="hbCate" id="hbCate" className="border rounded-lg p-2 w-1/2"
            value={hbData.hbCate} onChange={handleChange} required>
                <option value="">-เลือกหมวดหมู่-</option>
                <option value={10}>ราก</option>
                <option value={20}>เปลือกไม้</option>
                <option value={30}>เนื้อไม้</option>
                <option value={40}>ใบ</option>
                <option value={50}>อื่น ๆ</option>
            </select><br />
            <label>สรรพคุณ (*)</label>:<br />
            <textarea rows={3} cols={50} name="hbProp" id="hbProp" className="border rounded-lg p-2 w-1/2"
                onChange={handleChange} value={hbData.hbProp} required
            /><br />
            <label>ผู้ผลิต</label>:<br />
            <input type="text" name="hbSupp" id="hbSupp" className="border rounded-lg p-2 w-1/2"
            onChange={handleChange} value={hbData.hbSupp} /><br />
            <div className="p-3">
                <button type="clear">[ Submit ]</button>
                <button type="reset">[ Reset ]</button>
            </div>
            </form>
        </div>
    );
}