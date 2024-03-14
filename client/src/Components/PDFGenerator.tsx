import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/Icons/levitationPdf.png';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import getProductByIdAPI from '../APIs/getProductByIdAPI';

interface Item {
  id: string;
  name: string;
  quantity: number;
  rate: number;
}

interface MyDocumentProps {
  productData: any; 
}

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
    marginTop:-8,
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
  ProductTagProduct:{
    marginLeft: 7,
    fontSize: 15,
    marginBottom:15
  },
  ProductTag: {
    marginLeft: 120,
    fontSize: 15,
    marginBottom:15
  },
  ProductDataDiv:{
    flexDirection: 'row',
    
  },
  ProductTagDataFirst:{
    fontSize: 12,
    marginLeft: 10,
    marginTop:30,
    marginBottom:15
  },
  ProductTagData:{
    fontSize: 12,
    marginLeft: 72,
    marginTop:30,
    marginBottom:15
  },
  ProductTagDataQty:{
    fontSize: 12,
    marginLeft: 125,
    marginTop:30,
    marginBottom:15,
    color:'#6772c2'
  },
  ProductTagDataRate:{
    fontSize: 12,
    marginLeft: 140,
    marginTop:30,
    marginBottom:15
  },
  ProductTagDataPrice:{
    fontSize: 12,
    marginLeft: 130,
    marginTop:30,
    marginBottom:15,
    fontWeight:'bold',
    
  },
  GrossDiv:{
    position :'absolute',
    right:25,
    top:350,
  },
  GrossCont:{
    flexDirection: 'row',
  },
  GrossTotalTag:{
    fontSize: 13,
    marginTop:10,
  },
  GrossTotal:{
    fontSize: 12,
    marginLeft:100,
    marginTop:10,
  },
  GrossGSTTag:{
    fontSize: 13,
    marginTop:10,
    marginBottom:5,
    color : '#808080'
  },
  GrossGST:{
    fontSize: 12,
    marginLeft:100,
    marginTop:10,
    marginBottom:5,
    color : '#808080'
  },
  GrossGrandTag:{
  fontSize: 13,
  marginTop:5,
  marginBottom:5
  },
  GrossGrand:{
    marginTop:5,
    fontSize: 12,
    marginLeft:60,
    color:'#6772c2'
  },
  validTill:{
    position :'absolute',
    left:25,
    top:600,
    fontSize: 12,
    color : '#808080'
  }
});

const calculateTotal = (items: Item[]): number => {
  return items.reduce((accumulator, currentItem) => {
    const itemTotal = currentItem.quantity * currentItem.rate;
    return accumulator + itemTotal;
  }, 0); 
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}



const MyDocument: React.FC<MyDocumentProps> = ({ productData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>INVOICE GENERATOR</Text>
        <Image src={logo} style={styles.logo} />
        <View style={styles.ProductTagDiv}>
          <Text style={styles.ProductTagProduct}>Product</Text>
          <Text style={styles.ProductTag}>Qty</Text>
          <Text style={styles.ProductTag}>Rate</Text>
          <Text style={styles.ProductTag}>Total</Text>
        </View>
        <View style={styles.line} />
        {productData.items.map((item: Item) => (
          <View style={styles.ProductDataDiv} key={item.id}>
            <Text style={styles.ProductTagDataFirst}>{item.name}</Text>
            <Text style={styles.ProductTagDataQty}>{item.quantity}</Text>
            <Text style={styles.ProductTagDataRate}>{item.rate}</Text>
            <Text style={styles.ProductTagDataPrice}>{item.quantity * item.rate}</Text>
          </View>
        ))}
        <View style={styles.line} />
        <View style={styles.GrossDiv}>
          <View style={styles.GrossCont}>
            <Text style={styles.GrossTotalTag}>Total</Text>
            <Text style={styles.GrossTotal}>INR {calculateTotal(productData.items).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.GrossCont}>
            <Text style={styles.GrossGSTTag}>GST</Text>
            <Text style={styles.GrossGST}>18%</Text>
          </View>
          <View style={styles.line2} />
          <View style={styles.GrossCont}>
            <Text style={styles.GrossGrandTag}>Grand Total</Text>
            <Text style={styles.GrossGrand}>Rs {calculateTotal(productData.items) * 1.18}</Text>
          </View>
          <View style={styles.line2} />
        </View>
        <Text style={styles.validTill}>Valid Until: {formatDate(productData.validUntil)}</Text>
        <View style={styles.bottom} >
          <Text style={styles.tncHeading}>Terms and Conditions</Text>
          <Text style={styles.tncText}>we are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const PDFGenerator: React.FC = () => {
  const { id } = useParams<{ id: any }>() ?? { id: String };
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getProductByIdAPI(id); 
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.error('Error fetching product:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductData();
  }, [id]);

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      {productData && <MyDocument productData={productData} />}
    </PDFViewer>
  );
};

export default PDFGenerator;