/* @flow */

// Libs
import { api } from 'utils'

// Types
import type {
  GetState,
  Dispatch,
  ThunkAction,

  HomeFilterByCategoryAction,
  HomeFilterByCategoryActions,
  HomeFilterByCategoryProgressAction,
  HomeFilterByCategorySuccessAction,
  HomeFilterByCategoryFailAction,

  HomeEndpointServerResponse
} from 'types'

// Actions
export const homeFilterByCategoryAsync = (categoryId: string): ThunkAction => async (dispatch: Dispatch, getState: GetState): Promise<HomeFilterByCategoryActions> => {
  try {
    dispatch(homeFilterByCategory())

    dispatch(homeFilterByCategoryProgress())

    const params = {
      filterByCategory: categoryId
    }

    const state = getState()
    const json = await api()
      .fromRoot()
      .addPath('api/blogs')
      .addPath(state.config.hostname)
      .setParams(params)
      .fetch()

    return dispatch(homeFilterByCategorySuccess(categoryId, json))
  } catch (ex) {
    console.error(ex)
    return dispatch(homeFilterByCategoryFail())
  }
}

const homeFilterByCategory = () : HomeFilterByCategoryAction => ({
  type: 'HOME_FILTER_BY_CATEGORY'
})

const homeFilterByCategoryProgress = (): HomeFilterByCategoryProgressAction => ({
  type: 'HOME_FILTER_BY_CATEGORY_PROGRESS'
})

const homeFilterByCategorySuccess = (category: string, data: HomeEndpointServerResponse): HomeFilterByCategorySuccessAction => ({
  type: 'HOME_FILTER_BY_CATEGORY_SUCCESS',
  payload: {
    category,
    data
  }
})

const homeFilterByCategoryFail = (): HomeFilterByCategoryFailAction => ({
  type: 'HOME_FILTER_BY_CATEGORY_FAIL'
})