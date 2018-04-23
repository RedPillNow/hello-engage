/* Common models used by the search components. */

namespace Dig {

	export const SEARCH_TERM_SELECTED_EVENT = 'searchtermselected';
	export const SEARCH_FACET_CHANGED_EVENT = 'searchfacetchanged';
	export const SEARCH_FACETS_LOADED_EVENT = 'searchfacetsloaded';
	export const SHOW_SAVED_SEARCHES_EVENT = 'showsavedsearches';
	export const HIDE_SAVED_SEARCHES_EVENT = 'hidesavedsearches';
	export const SAVE_SEARCH_EVENT = 'savesearch';
	export const CLEAR_SEARCH_EVENT = 'clearsearch';
	export const DO_SAVED_SEARCH_EVENT = 'dosavedsearch';
	export const DISPLAY_SEARCH_RESULTS_EVENT = 'displaysearchresults';
	export const UPDATE_SIDEBAR_VIEW_EVENT = 'updatesidebarview';

	/**
	 * SearchFacets contains three {@link SearchFacetSection} objects: one for applications, one for cards (forms),
	 * and one for fields.
	 *
	 * @param applicationFacetSection
	 * @param cardFacetSection
	 * @param fieldFacetSection
	 * @constructor
	 */
	export class SearchFacets {

		applications: SearchFacetSection;
		cards: SearchFacetSection;
		fields: SearchFacetSection;
		sections: SearchFacetSection[];

		constructor(termApiObject?: any, appFacetTitle: string = 'Application', cardFacetTitle: string = 'Form Name',
					fieldFacetTitle: string = 'Field Name') {
			const apps = new SearchFacetSection(appFacetTitle);
			const cards = new SearchFacetSection(cardFacetTitle);
			const fields = new SearchFacetSection(fieldFacetTitle);
			if (termApiObject && termApiObject['digfacets']) {
				apps.createFacets(termApiObject['digfacets']['application']);
				cards.createFacets(termApiObject['digfacets']['cards']);
				fields.createFacets(termApiObject['digfacets']['fields']);
			}
			this.applications = apps;
			this.cards = cards;
			this.fields = fields;
			this.sections = [this.applications, this.cards, this.fields];
		}
	}

	export class SearchFacetSection {

		title: string;
		facets: Map<string, SearchFacet>;

		get id(): string {
			if (this.title) {
				return this.title.replace(' ', '').toLowerCase();
			}
			return null;
		}

		get facetValues(): SearchFacet[] {
			return Array.from(this.facets.values());
		}

		get selectedIds(): string[] {
			const selectedIds: string[] = [];
			this.facets.forEach((facet: SearchFacet, id: string) => {
				if (facet.selected) {
					selectedIds.push(facet.id);
				}
			});
			return selectedIds;
		};

		set selectedIds(selectedIds: string[]) {
			this.facets.forEach((facet) => {
				facet.selected = selectedIds.indexOf(facet.id) > -1;
			});
		};

		constructor(title: string) {
			// console.log('dig-search-models.SearchFacetSection', arguments);
			this.title = title;
			this.facets = new Map<string, SearchFacet>();
		}

		/**
		 * Creates a new {@link Dig#SearchFacet} instance and adds it to the
		 * {@link Dig#SearchFacetSection#facets} property, or increases the count if the facet already exists.
		 */
		createFacet(id: string, name: string, count: number = 1) {
			if (this.facets.get(id)) {
				this.facets.get(id).count++;
			} else {
				this.facets.set(id, new SearchFacet(id, name, false, count));
			}
		}

		createFacets(facetSectionApiObject: any) {
			if (facetSectionApiObject) {
				Object.keys(facetSectionApiObject).forEach((facetId) => {
					this.createFacet(facetId, facetSectionApiObject[facetId][0], facetSectionApiObject[facetId][1]);
				});
			}
		}
	}

	export class SearchFacet {

		id: string;
		name: string;
		selected: boolean;
		count: number;

		constructor(id: string, name: string, selected: boolean, count: number) {
			// console.log('dig-search-models.SearchFacet', arguments);
			this.id = id;
			this.name = name;
			this.selected = selected;
			this.count = count;
		}
	}

	/**
	 * Represents a visible search result. This class doesn't extend Dig.Vertex because it's built from a few different
	 * different vertices returned in the search result response.
	 *
	 * @see Dig.DigSearchResults
	 */
	export class SearchResultItem {
		private _searchTerm: string;

		constructor(public appId: string,
					public appTitle: string,
					public docId: string,
					public cardId: string,
					public cardTitle: string,
					public fieldId: string,
					public fieldLabelTitle: string,
					public fieldValue: string,
					public modifiedDate: string,
					public lastEditor: string,
					public fieldName: string,
					public valueId: string,
					public replicaId: string,
					/** '#containsterm' edge with resolved vertex; API object **/
					public apiObject: any) {
		}

		get searchTerm() {
			return this._searchTerm;
		}

		set searchTerm(searchTerm) {
			this._searchTerm = searchTerm;
		}

		static isRichTextResultItem(digHitsItem: any) {
			let isRichText = false;
			if (digHitsItem && digHitsItem.hasOwnProperty('applicationid')) {
				isRichText = true;
			}
			return isRichText;
		}

		static parseSearchResults(termApiObject: any, searchTerm: string): SearchResultItem[] {
			console.debug('Dig.SearchResultItem parseSearchResults', arguments);
			let resultItems: SearchResultItem[] = [];
			let termValues: any[] = null;
			let richTextTermValues: any[] = null;
			if (Array.isArray(termApiObject)) {
				console.debug('Dig.SearchResultItem parseSearchResults, termApiObject is an Array', termApiObject);
				resultItems = SearchResultItem.parseMultiTermQueryResults(termApiObject, searchTerm);
			} else {
				console.debug('Dig.SearchResultItem parseSearchResults, termApiObject is NOT an Array', termApiObject);
				termValues = termApiObject['#containsterm'];
				resultItems = SearchResultItem.parseTerms(termValues, termApiObject);

				richTextTermValues = termApiObject['#richtextcontainsterm'];
				let rtResults = [];
				rtResults = SearchResultItem.parseRichTextTerms(richTextTermValues, termApiObject, searchTerm);
				resultItems = resultItems ? resultItems.concat(rtResults) : rtResults;
			}
			return resultItems;
		}

		private static parseMultiTermQueryResults(termApiObject: any[], searchTerm: string): SearchResultItem[] {
			let results: SearchResultItem[] = [];
			if (termApiObject) {
				termApiObject.forEach((resultItem) => {
					let item = null;
					if (resultItem && SearchResultItem.isRichTextResultItem(resultItem.dighits)) {
						item = SearchResultItem.getSearchResultItem(resultItem, searchTerm, resultItem.sourcemetaid.substr(0, 16), resultItem.sourcemetaid);
						if (item) {
							results.push(item);
						}else {
							console.log('SearchResultItem.parseMultiTermQueryResults, item is null for', resultItem);
						}
					} else if (resultItem) {
						Object.keys(resultItem.dighits).forEach(function (replicaId) {
							let digHits = resultItem.dighits;
							if (digHits[replicaId] && Object.keys(digHits[replicaId]).length > 0) {
								Object.keys(digHits[replicaId]).forEach(function (docId) {
									item = SearchResultItem.getSearchResultItem(resultItem, searchTerm, replicaId, docId);
									if (item) {
										results.push(item);
									}else {
										console.log('SearchResultItem.parseMultiTermQueryResults, item is null for', resultItem);
									}
								});
							}
						});
					}
				});
			}
			return results;
		}

		private static parseRichTextTerms(rtTermValues: any[], termApiObject: any, searchTerm): SearchResultItem[] {
			let resultItems = [];
			if (rtTermValues) {
				rtTermValues.forEach(function (value) {
					if (value && value.text) {
						if (value.dighits) {
							let resultItem = SearchResultItem.getSearchResultItem(value, searchTerm);
							if (resultItem) {
								resultItems.push(resultItem);
							} else {
								console.log('SearchResultItem.parseRichTextTerms, item is null for', value);
							}
						}
					}
				});
			}
			return resultItems;
        }

		private static getRichTextAbstract(value, searchTerm): string {
			let abstract = null;
			if (value && value.text) {
				// Remove all carriage returns
				let isMulti = searchTerm && searchTerm.indexOf(' ') > -1;
				let cleanValue = value.text.toLowerCase().replace(/[\r\n]/g, ' ');
				let abstractValueArr = cleanValue.split(' ');
				let termIdx = -1;
				let startValIdx = -1;
				let endValIdx = -1;
				if (isMulti) {
					abstractValueArr = abstractValueArr.filter((item, idx) => {
						return item ? true : false;
					});
					let searchTermArr = searchTerm.split(' ');
					let searchTermArrLen = searchTermArr.length;
					let searchTermLastIdx = searchTermArrLen - 1;
					let lastSearchTerm = searchTermArr[searchTermLastIdx];
					let nextValIdx = 0;
					let getNext = (startIdx) => {
						return abstractValueArr[startIdx + 1];
					}
					let parseAbstractArr = (startIdx, nextValIdx) => {
						for (let i = startIdx; i < abstractValueArr.length; i++) {
							let word = abstractValueArr[i];
							let searchTermArrIdx = searchTermArr.indexOf(word);
							if (searchTermArrIdx > -1 && searchTermArrIdx === nextValIdx) {
								let nextWord = getNext(i);
								let nextSearchTermIdx = searchTermArr.indexOf(nextWord);
								if (nextSearchTermIdx === nextValIdx + 1 && word === searchTermArr[0]) {
									startValIdx = i;
									nextValIdx++;
									parseAbstractArr(i + 1, nextValIdx);
									break;
								} else if (word !== lastSearchTerm && startValIdx > -1 && nextSearchTermIdx > startValIdx) {
									nextValIdx++;
									parseAbstractArr(i + 1, nextValIdx);
								} else if (startValIdx > -1 && word === lastSearchTerm) {
									endValIdx = i;
									break;
								}
							}
						}
					}
					parseAbstractArr(0, nextValIdx);
				} else {
					// console.log('Search.parseSearchResults, abstractArr=', abstractArr);
					// remove empty array items and attempt to determine the search term index in the abstractArr
					abstractValueArr = abstractValueArr.filter((item, idx) => {
						let isTerm = item ? true : false;
						if (isTerm && item === searchTerm.toLowerCase() && termIdx === -1) {
							termIdx = idx;
						}
						return isTerm;
					});
					// Find the search term index in the abstractArr
					// termIdx = abstractValueArr.indexOf(searchTerm.toLowerCase());
					if (termIdx === -1) {
						let findArr = abstractValueArr.filter((item, idx, arr) => {
							let termFound = item.indexOf(searchTerm.toLowerCase()) > -1;
							if (termFound) {
								termIdx = idx;
							}
							return termFound;
						});
					}
				}
				// console.log('Search.parseSearchResults, termIdx=', termIdx);
				let startIdx = -1;
				let endIdx = -1
				let abstractValArrLastIdx = abstractValueArr.length - 1;
				if (termIdx > -1 && !isMulti) {
					startIdx = termIdx - 3 > 0 ? termIdx - 3 : termIdx;
					endIdx = termIdx + 4 > abstractValueArr.length - 1 ? abstractValArrLastIdx : termIdx + 4;
				} else if (isMulti && startValIdx > -1 && endValIdx > -1) {
					startIdx = startValIdx - 2 > 0 ? startValIdx - 2 : startValIdx;
					endIdx = endValIdx + 3 > abstractValArrLastIdx ? abstractValArrLastIdx : endValIdx + 3;
				}
				abstract = abstractValueArr.slice(startIdx, endIdx).join(' ');
			} else {
				// console.log('SearchResultItem.getRichTextAbstract, no value', value);
			}
			return abstract;
		}

		private static parseTerms(termValues: any[], termApiObject: any): SearchResultItem[] {
			let resultItems: SearchResultItem[] = [];
			if (termValues) {
				termValues.forEach(function (value) {
					if (value && value.dighits && Object.keys(value.dighits).length > 0) {
						Object.keys(value.dighits).forEach(function (replicaId) {
							// console.log('Dig.SearhResultItem parseSearchResults, replicaId=', replicaId);
							if (!SearchResultItem.isRichTextResultItem(replicaId)) {
								if (value.dighits[replicaId] && Object.keys(value.dighits[replicaId]).length > 0) {
									Object.keys(value.dighits[replicaId]).forEach(function (docId) {
										// console.log('Dig.SearchResultItem parseSearchResults, docId=', docId);
										let resultItem = SearchResultItem.getSearchResultItem(value, termApiObject.value, replicaId, docId);
										if (resultItem) {
											resultItems.push(resultItem);
										} else {
											console.log('SearchResultItem.parseTerms, resultItem is null for', value);
										}
									});
								}
							}
						});
					}
				});
			}
			return resultItems;
		}

		private static getSearchResultItem(termValue, searchTerm, replicaId?, docId?): SearchResultItem {
			let resultItem = null;
			if (termValue) {
				let isRichText = SearchResultItem.isRichTextResultItem(termValue.dighits);
				if (isRichText) {
					let abstract = SearchResultItem.getRichTextAbstract(termValue, searchTerm);
					// console.log('SearchResultItem.getSearchResultItem, richText abstract=', termValue);
					resultItem = new SearchResultItem(termValue.dighits.applicationid,
						termValue.dighits.applicationtitle,
						docId,
						termValue.dighits.cardid,
						termValue.dighits.cardtitle,
						null,
						termValue.dighits.labeltitle,
						abstract,
						termValue.dighits.modifieddate,
						termValue.dighits.lasteditor,
						null,
						null,
						replicaId,
						termValue);
					resultItem.searchTerm = searchTerm;
				} else {
					let hit = termValue.dighits[replicaId][docId];
					let cleanFieldValue = termValue.value.replace(/[\r\n]/g, ' ');
					resultItem = new SearchResultItem(termValue.hitapps[replicaId][1],
						termValue.hitapps[replicaId][0],
						docId,
						hit.cardid,
						hit.cardtitle,
						hit.labelid,
						hit.labeltitle,
						cleanFieldValue,
						hit.modifieddate,
						hit.lasteditor,
						hit.hitproperty,
						termValue['@id'],
						replicaId,
						termValue);
					resultItem.searchTerm = searchTerm;
				}
			}
			return resultItem;
		}
	}

	export class SavedSearch extends Dig.Vertex {

		title: string;
		searchTerm: string;
		facetIds: string[];
		termId: string;
		applications: string[];
		forms: string[];
		fields: string[];

		setApiObject(apiObject: any) {
			super.setApiObject(apiObject);
			if (apiObject) {
				this.title = apiObject['title'];
				this.searchTerm = apiObject['searchterm'];
				this.termId = apiObject['termid'];
				this.applications = apiObject['applicationfacetvalues'];
				this.forms = apiObject['formfacetvalues'];
				this.fields = apiObject['fieldfacetvalues'];
			}
			// TODO: Parse facets
		}
	}

	/**
	 * Represents a few fields from the Term vertex retrieved for search term type-ahead results.
	 */
	export class SearchTermMatch {
		id: string;
		value: string;
		dighits: number;

		constructor(apiObject?: any) {
			if (apiObject) {
				this.id = apiObject['@id'];
				this.value = apiObject.value;
				this.dighits = apiObject.dighits;
			}
		}

		static parseTypeAheadResults(response: Array<any>): SearchTermMatch[] {
			return response.filter(function (result) {
				return true;
			}).map(function (term) {
				return new SearchTermMatch(term);
			});
		}

		static find(searchTerms: SearchTermMatch[], searchText: string) {
			// TODO: Change to filter for Edge, IE, or Safari?
			return searchTerms.find((searchTerm) => {
				return searchTerm.value.toLowerCase() === searchText.toLowerCase();
			});
		}
	}

	export class SearchTermSelectedDetail {

		constructor(public searchText: string,
					public typeAheadQuery: Promise<SearchTermMatch[]>) {
		}
	}

}
