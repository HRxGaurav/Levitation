import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/Icons/levitationPdf.png';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import getProductByIdAPI from '../APIs/getProductByIdAPI';
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        margin: 20,
        padding: 20,
        flexGrow: 1,
    },
    heading: {
        fontSize: 17,
        marginTop: -8,
    },
    content: {
        fontSize: 16,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#ebebf0',
    },
    line2: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    logo: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 100,
        height: 'auto',
    },
    bottom: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        padding: 25,
        backgroundColor: 'black',
        borderRadius: 50,
        color: 'white',
        paddingRight: 36,
        paddingLeft: 36,
    },
    tncHeading: {
        fontSize: 13,
    },
    tncText: {
        fontSize: 10,
        marginTop: 5
    },
    ProductTagDiv: {
        marginTop: 100,
        flexDirection: 'row',
    },
    ProductTagProduct: {
        marginLeft: 7,
        fontSize: 15,
        marginBottom: 15
    },
    ProductTag: {
        marginLeft: 120,
        fontSize: 15,
        marginBottom: 15
    },
    ProductDataDiv: {
        flexDirection: 'row',
    },
    ProductTagDataFirst: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 15
    },
    ProductTagData: {
        fontSize: 12,
        marginLeft: 72,
        marginTop: 30,
        marginBottom: 15
    },
    ProductTagDataQty: {
        fontSize: 12,
        marginLeft: 125,
        marginTop: 30,
        marginBottom: 15,
        color: '#6772c2'
    },
    ProductTagDataRate: {
        fontSize: 12,
        marginLeft: 140,
        marginTop: 30,
        marginBottom: 15
    },
    ProductTagDataPrice: {
        fontSize: 12,
        marginLeft: 130,
        marginTop: 30,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    GrossDiv: {
        position: 'absolute',
        right: 25,
        top: 350,
    },
    GrossCont: {
        flexDirection: 'row',
    },
    GrossTotalTag: {
        fontSize: 13,
        marginTop: 10,
    },
    GrossTotal: {
        fontSize: 12,
        marginLeft: 100,
        marginTop: 10,
    },
    GrossGSTTag: {
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        color: '#808080'
    },
    GrossGST: {
        fontSize: 12,
        marginLeft: 100,
        marginTop: 10,
        marginBottom: 5,
        color: '#808080'
    },
    GrossGrandTag: {
        fontSize: 13,
        marginTop: 5,
        marginBottom: 5
    },
    GrossGrand: {
        marginTop: 5,
        fontSize: 12,
        marginLeft: 60,
        color: '#6772c2'
    },
    validTill: {
        position: 'absolute',
        left: 25,
        top: 600,
        fontSize: 12,
        color: '#808080'
    }
});
const calculateTotal = (items) => {
    const total = items.reduce((accumulator, currentItem) => {
        const itemTotal = currentItem.quantity * currentItem.rate;
        return accumulator + itemTotal;
    }, 0);
    return total;
};
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
const MyDocument = ({ productData }) => (_jsx(Document, { children: _jsx(Page, { size: "A4", style: styles.page, children: _jsxs(View, { style: styles.section, children: [_jsx(Text, { style: styles.heading, children: "INVOICE GENERATOR" }), _jsx(Image, { src: logo, style: styles.logo }), _jsxs(View, { style: styles.ProductTagDiv, children: [_jsx(Text, { style: styles.ProductTagProduct, children: "Product" }), _jsx(Text, { style: styles.ProductTag, children: "Qty" }), _jsx(Text, { style: styles.ProductTag, children: "Rate" }), _jsx(Text, { style: styles.ProductTag, children: "Total" })] }), _jsx(View, { style: styles.line }), productData.items.map((item) => {
                    return (_jsx(_Fragment, { children: _jsxs(View, { style: styles.ProductDataDiv, children: [_jsx(Text, { style: styles.ProductTagDataFirst, children: item.name }), _jsx(Text, { style: styles.ProductTagDataQty, children: item.quantity }), _jsx(Text, { style: styles.ProductTagDataRate, children: item.rate }), _jsx(Text, { style: styles.ProductTagDataPrice, children: item.quantity * item.rate })] }, item.id) }));
                }), _jsx(View, { style: styles.line }), _jsxs(View, { style: styles.GrossDiv, children: [_jsxs(View, { style: styles.GrossCont, children: [_jsx(Text, { style: styles.GrossTotalTag, children: "Total" }), _jsxs(Text, { style: styles.GrossTotal, children: ["INR ", calculateTotal(productData.items)] })] }), _jsxs(View, { style: styles.GrossCont, children: [_jsx(Text, { style: styles.GrossGSTTag, children: "GST" }), _jsx(Text, { style: styles.GrossGST, children: "18%" })] }), _jsx(View, { style: styles.line2 }), _jsxs(View, { style: styles.GrossCont, children: [_jsx(Text, { style: styles.GrossGrandTag, children: "Grand Total" }), _jsxs(Text, { style: styles.GrossGrand, children: ["Rs ", calculateTotal(productData.items) * 1.18] })] }), _jsx(View, { style: styles.line2 })] }), _jsxs(Text, { style: styles.validTill, children: ["Valid Until: ", formatDate(productData.validUntil)] }), _jsxs(View, { style: styles.bottom, children: [_jsx(Text, { style: styles.tncHeading, children: "Terms and Conditions" }), _jsx(Text, { style: styles.tncText, children: "we are happy to supply any furthur infromation you may need and trust that you call on us to fill your order. which will receive our prompt and careful attention" })] })] }) }) }));
const PDFGenerator = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await getProductByIdAPI(id);
                if (response.ok) {
                    const data = await response.json();
                    setProductData(data);
                }
                else {
                    console.error('Error fetching product:', response.statusText);
                }
            }
            catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProductData();
    }, [id]);
    return (_jsx(PDFViewer, { style: { width: '100%', height: '100vh' }, children: productData && _jsx(MyDocument, { productData: productData }) }));
};
export default PDFGenerator;
