/*******************************************************************************
 * Copyright (c) 2004, 2007 Actuate Corporation.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0/.
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 *
 * Contributors:
 *  Actuate Corporation  - initial API and implementation
 *******************************************************************************/

package org.eclipse.birt.chart.ui.swt.interfaces;

import java.util.List;

import org.eclipse.birt.chart.exception.ChartException;
import org.eclipse.birt.chart.factory.IDataRowExpressionEvaluator;
import org.eclipse.birt.chart.model.Chart;
import org.eclipse.birt.chart.model.attribute.DataType;
import org.eclipse.birt.chart.ui.util.ChartUIConstants;

/**
 * Data service provider for chart wizard, to provide all necessary data.
 */

public interface IDataServiceProvider {
	/**
	 * Indicates if chart has data set
	 */
	int HAS_DATA_SET = 1;

	/**
	 * Indicates if chart has data cube
	 */
	int HAS_CUBE = 1 << 1;

	int DATA_BINDING_REFERENCE = 1 << 2;

	int IN_MULTI_VIEWS = 1 << 3;

	int SHARE_QUERY = 1 << 4;

	/**
	 * Indicates if current chart is a part of whole chart, such as plot or axis.
	 */
	int PART_CHART = 1 << 5;

	/**
	 * Indicates if current chart is using cube or sharing with crosstab or in
	 * multi-view, and cube's dimension count > 1.
	 */
	int MULTI_CUBE_DIMENSIONS = 1 << 6;

	int SHARE_TABLE_QUERY = 1 << 7;

	int SHARE_CROSSTAB_QUERY = 1 << 8;

	int INHERIT_COLUMNS_ONLY = 1 << 9;

	int INHERIT_COLUMNS_GROUPS = 1 << 10;

	int SHARE_CHART_QUERY = 1 << 11;

	/**
	 * Indicates if chart inherits data set from container
	 */
	int INHERIT_DATA_SET = 1 << 12;

	/**
	 * Indicates if chart inherits data cube from container
	 */
	int INHERIT_CUBE = 1 << 13;

	/**
	 * Indicates if the final shared object is chart.
	 */
	int SHARE_CHART_QUERY_RECURSIVELY = 1 << 14;

	/**
	 * Indicates if is cube and category is not top level
	 */
	int IS_CUBE_AND_CATEGORY_NOT_TOP_LEVEL = 1 << 15;

	/**
	 * Indicates if is cube and series is not top level
	 */
	int IS_CUBE_AND_SERIES_NOT_TOP_LEVEL = 1 << 16;

	/**
	 * Indicates if category data is non hierarchy values.
	 */
	int USE_NON_HIERARCHY_CATEGORY_DATA = 1 << 17;

	/**
	 * Does some initialization works in this method.
	 *
	 * @throws ChartException
	 */
	void initialize() throws ChartException;

	/**
	 * Disposes associated handles in this method.
	 */
	void dispose();

	/**
	 * Returns all available style names.
	 */
	String[] getAllStyles();

	/**
	 * Returns all available style display names. Note the count should be identical
	 * with getAllStyles().
	 *
	 * @since 2.1
	 */
	String[] getAllStyleDisplayNames();

	/**
	 * Returns the name of current used style.
	 */
	String getCurrentStyle();

	/**
	 * Sets current used style by specified style name.
	 */
	void setStyle(String styleName);

	/**
	 * Fetches data from dataset.
	 *
	 * @param sExpressions column expression array in the form of javascript. Null
	 *                     will return all columns of dataset.
	 * @param iMaxRecords  max row count. -1 returns default count or the preference
	 *                     value.
	 * @param byRow        true: by row first, false: by column first
	 * @return Data array. if type is by row, array length is row length; if type is
	 *         by column, array length is column length
	 */
	Object[] getDataForColumns(String[] sExpressions, int iMaxRecords, boolean byRow) throws ChartException;

	/**
	 * Returns whether live preview is enabled
	 *
	 * @return whether live preview is enabled
	 */
	boolean isLivePreviewEnabled();

	/**
	 * Returns the data type according to the query expression.
	 *
	 * @param expression
	 * @return 2.2
	 */
	DataType getDataType(String expression);

	/**
	 * Prepare row expression evaluator for chart to bind data.
	 *
	 * @param cm
	 * @param lExpressions
	 * @param iMaxRecords
	 * @param byRow
	 * @throws ChartException
	 * @since BIRT 2.3
	 */
	IDataRowExpressionEvaluator prepareRowExpressionEvaluator(Chart cm, List<String> lExpressions, int iMaxRecords,
			boolean byRow) throws ChartException;

	/**
	 * Updates some custom data which is related with invoker.
	 *
	 * @param type
	 * @param value
	 * @see ChartUIConstants#QUERY_CATEGORY
	 * @see ChartUIConstants#QUERY_OPTIONAL
	 * @see ChartUIConstants#QUERY_VALUE
	 * @since 2.3
	 *
	 */
	boolean update(String type, Object value);

	/**
	 * Returns state information of current data service provider.
	 *
	 * @return state
	 * @since 2.3
	 */
	int getState();

	/**
	 * Checks if the state in provide includes this.
	 *
	 * @param state
	 * @return (getState() & state) == state
	 * @since 2.3
	 */
	boolean checkState(int state);

	/**
	 * Check data for the invoker.
	 *
	 * @param checkType
	 * @param data
	 * @since 2.3
	 */
	Object checkData(String checkType, Object data);

}
