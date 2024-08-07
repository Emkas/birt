/*************************************************************************************
 * Copyright (c) 2011, 2012, 2013 James Talbut.
 *  jim-emitters@spudsoft.co.uk
 *
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0/.
 * 
 * SPDX-License-Identifier: EPL-2.0
 * 
 * Contributors:
 *     James Talbut - Initial implementation.
 ************************************************************************************/

package uk.co.spudsoft.birt.emitters.excel.handlers;

import org.eclipse.birt.core.exception.BirtException;
import org.eclipse.birt.report.engine.content.ICellContent;
import org.eclipse.birt.report.engine.content.IRowContent;

import uk.co.spudsoft.birt.emitters.excel.HandlerState;
import uk.co.spudsoft.birt.emitters.excel.framework.Logger;

public class TopLevelTableRowHandler extends AbstractRealTableRowHandler {

	public TopLevelTableRowHandler(Logger log, IHandler parent, IRowContent row) {
		super(log, parent, row, 0);
	}

	@Override
	public void startRow(HandlerState state, IRowContent row) throws BirtException {
		super.startRow(state, row);
		state.rowOffset = 0;
	}

	@Override
	public void startCell(HandlerState state, ICellContent cell) throws BirtException {
		state.setHandler(new TopLevelTableCellHandler(state.getEmitter(), log, this, cell));
		state.getHandler().startCell(state, cell);
	}

	@Override
	protected boolean isNested() {
		return false;
	}
}
