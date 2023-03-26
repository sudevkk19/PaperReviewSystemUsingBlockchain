package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
	"github.com/hyperledger/fabric/common/flogging"
)

// SmartContract Define the Smart Contract structure
type SmartContract struct {
}

type Paper struct {
	PaperID string `json:"paperid"`
	AuthorID string `json:"authorid"`
	ConfID string `json:"confid"`
	PaperName string `json:"name"`
	PaperHash string `json:"hash"`
	PaperDomains string `json:"paperdomains"`
	PaperReviewerIndex string `json:"paperreviewerindex"`
	PaperReviewerScore string `json:"paperreviewerscore"`
	PaperReviewHash string `json:"paperreviewhash"`
	PaperStage string `json:"paperstage"`
	PaperResult string `json:"paperreviewers"`
}

type Conference struct {
	ConferenceID string `json:"conferenceid"`
	ConferenceName string `json:"conferencename"`
	ConferenceDomains string `json:"conferencedomains"`	
	Phase string `json:"phase"`
	PaperList string `json:"paperlist"`
	ReviewerList string `json:"reviewerlist"`
}

// Car :  Define the car structure, with 4 properties.  Structure tags are used by encoding/json library
type Car struct {
	Make   string `json:"make"`
	Model  string `json:"model"`
	Colour string `json:"colour"`
	Owner  string `json:"owner"`
}



// Init ;  Method for initializing smart contract
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

var logger = flogging.MustGetLogger("fabcar_cc")

// Invoke :  Method for INVOKING smart contract
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()
	logger.Infof("Function name is:  %d", function)
	logger.Infof("Args length is : %d", len(args))

	switch function {
	case "queryCar":
		return s.queryCar(APIstub, args) 
	case "initLedger":
		return s.initLedger(APIstub) 
	case "createCar":
		return s.createCar(APIstub, args) 
	case "queryAllCars":
		return s.queryAllCars(APIstub) 
	case "changeCarOwner":
		return s.changeCarOwner(APIstub, args)  
	case "getHistoryForAsset":
		return s.getHistoryForAsset(APIstub, args) 
	case "queryCarsByOwner":
		return s.queryCarsByOwner(APIstub, args)  
	case "queryPaper":
		return s.queryPaper(APIstub, args)
	case "addConferenceState":
		return s.addConferenceState(APIstub, args)
	case "addPaperState":
		return s.addPaperState(APIstub, args)

	default:
		return shim.Error("Invalid Smart Contract function name.")
	}
}

func (s *SmartContract) queryCar(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(carAsBytes)
}

func (s *SmartContract) queryPaper(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(carAsBytes)
}




func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

	/*papers := []Paper{
        Paper{PaperID:1, ConfID:1, PaperHash:"shambu", HasBeenReviewed:false},
		Paper{PaperID:2, ConfID:2, PaperHash:"shambu", HasBeenReviewed:false},
	}*/
	papers := []Conference{
        Conference{ConferenceID:"1234", PaperList:"[]", Phase:"0"},
		Conference{ConferenceID:"1234", PaperList:"[]", Phase:"0"},
	}
	i := 0	
	for i < len(papers) {
		carAsBytes, _ := json.Marshal(papers[i])
		APIstub.PutState("CONF"+strconv.Itoa(i), carAsBytes)
		i = i + 1
	}

	return shim.Success(nil)
}

func (s *SmartContract) createCar(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var car = Car{Make: args[1], Model: args[2], Colour: args[3], Owner: args[4]}

	carAsBytes, _ := json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)

	indexName := "owner~key"
	colorNameIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{car.Owner, args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	APIstub.PutState(colorNameIndexKey, value)

	return shim.Success(carAsBytes)
}


func (s *SmartContract) addConferenceState(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	/*PaperID int `json:"paperid"`
	ConfID int `json:"confid"`
	PaperHash string `json:"hash"`
	HasBeenReviewed bool  `json:"RState"`
	ReviewerList []int `json:"reviewers"`*/

	/*ConferenceID string `json:"conferenceid"`
	ConferenceName string `json:"conferencename"`
	ConferenceDomains string `json:"conferencedomains"`
	PaperList string `json:"paperlist"`
	ReviewerList string `json:"reviewerlist"`
	Phase string `json:"phase"`*/

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting 6")
	}
	conf := Conference{ConferenceID:args[0], ConferenceName:args[1], ConferenceDomains:args[2], Phase:args[3], PaperList:args[4],ReviewerList:args[5]}
	confAsBytes, _ := json.Marshal(conf)
	APIstub.PutState("CONF"+args[0], confAsBytes)

	/*indexName := "owner~key"
	colorNameIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{paper.PaperHash, args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	APIstub.PutState(colorNameIndexKey, value)*/

	return shim.Success(confAsBytes)
}

func (s *SmartContract) addPaperState(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	/*PaperID string `json:"paperid"`
	AuthorID string `json:"authorid"`
	ConfID string `json:"confid"`
	PaperName string `json:"name"`
	PaperHash string `json:"hash"`
	PaperDomains string `json:"paperdomains"`
	PaperReviewerIndex string `json:"paperreviewerindex"`
	PaperReviewerScore string `json:"paperreviewerscore"`
	PaperReviewHash string `json:"paperreviewhash"`
	PaperStage string `json:"paperstage"`
	PaperResult string `json:"paperreviewers"`*/

	if len(args) != 11{
		return shim.Error("Incorrect number of arguments. Expecting 11")
	}

	paper:= Paper{PaperID:args[0],AuthorID:args[1], ConfID:args[2], PaperName:args[3], PaperHash: args[4], PaperDomains: args[5], PaperReviewerIndex:args[6], PaperReviewerScore:args[7], PaperReviewHash:args[8], PaperStage:args[9], PaperResult:args[10]}
	paperasbytes,_ := json.Marshal(paper)
	APIstub.PutState("PAPER"+args[0] ,paperasbytes)

	return shim.Success(paperasbytes)
}



func (S *SmartContract) queryCarsByOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	var conf = Car{Make:"sud"}
	carasbytes, _:= json.Marshal(conf) 
	APIstub.PutState(args[0], carasbytes)
	fmt.Println("yo")

	return shim.Success(carasbytes)
}

func (s *SmartContract) queryAllCars(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "CAR0"
	endKey := "CAR999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllCars:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}


func (s *SmartContract) changeCarOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	carAsBytes, _ := APIstub.GetState(args[0])
	car := Car{}

	json.Unmarshal(carAsBytes, &car)
	car.Owner = args[1]

	carAsBytes, _ = json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)

	return shim.Success(carAsBytes)
}


func (t *SmartContract) getHistoryForAsset(stub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	paperName := args[0]

	resultsIterator, err := stub.GetHistoryForKey(paperName)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
		// if it was a delete operation on given key, then we need to set the
		//corresponding value null. Else, we will write the response.Value
		//as-is (as the Value itself a JSON marble)
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getHistoryForAsset returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}


// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
