import FilterProductsWindow from '../components/FilterProductsWindow/FilterProductsWindow'
import FlexContainer from '../components/FlexContainer/FlexContainer'
import ProductsList from '../components/ProductsList/ProductsList'
const StockLayout = () => {
	return (
		<FlexContainer column={true} overflow={'hidden'}>
			<FilterProductsWindow />
			<ProductsList />
		</FlexContainer>
	)
}

export default StockLayout
